import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { TextureLoader, ShaderMaterial } from "three";

export default function LUTPlane({ imageSrc, lutSrc, sliders }) {
  const ref = useRef();
  const [texture, setTexture] = useState(null);
  const [lutTexture, setLUTTexture] = useState(null);

  useEffect(() => {
    if (!imageSrc) return;
    new TextureLoader().load(imageSrc, (tex) => setTexture(tex));
    new TextureLoader().load(lutSrc, (tex) => setLUTTexture(tex));
  }, [imageSrc, lutSrc]);

  useFrame(() => {
    if (ref.current && texture && lutTexture) {
      ref.current.material.uniforms.u_image.value = texture;
      ref.current.material.uniforms.u_lut.value = lutTexture;
      ref.current.material.uniforms.u_grain.value = sliders.grain / 100;
      ref.current.material.uniforms.u_exposure.value = sliders.exposure;
      ref.current.material.uniforms.u_tint.value = sliders.tint;
    }
  });

  if (!texture || !lutTexture) return null;

  const shader = new ShaderMaterial({
    uniforms: {
      u_image: { value: texture },
      u_lut: { value: lutTexture },
      u_grain: { value: sliders.grain / 100 },
      u_exposure: { value: sliders.exposure },
      u_tint: { value: sliders.tint },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      precision mediump float;
      uniform sampler2D u_image;
      uniform sampler2D u_lut;
      uniform float u_grain;
      uniform float u_exposure;
      uniform float u_tint;
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D(u_image, vUv);
        vec3 lutColor = texture2D(u_lut, color.xy).rgb;
        lutColor = lutColor * pow(2.0, u_exposure);
        lutColor.r += u_tint * 0.1;
        lutColor.g += u_tint * 0.05;
        lutColor.b -= u_tint * 0.05;
        float grain = (fract(sin(dot(gl_FragCoord.xy ,vec2(12.9898,78.233))) * 43758.5453)-0.5)*u_grain;
        lutColor += grain;
        gl_FragColor = vec4(clamp(lutColor,0.0,1.0),1.0);
      }
    `,
  });

  return <mesh ref={ref}><planeGeometry args={[4,4]} /><primitive object={shader} attach="material" /></mesh>;
}
