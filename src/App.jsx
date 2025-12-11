import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import UploadDropzone from "./components/UploadDropzone";
import FilmControls from "./components/FilmControls";
import Sliders from "./components/Sliders";
import PremiumModal from "./components/PremiumModal";
import LUTPlane from "./LUTPlane";

import classicChromeLUT from "./luts/classic_chrome.cube?raw";
import velviaLUT from "./luts/velvia.cube?raw";
import portraLUT from "./luts/portra.cube?raw";

const filmPresets = {
  classic_chrome: { name: "Classic Chrome", lut: classicChromeLUT },
  velvia: { name: "Velvia", lut: velviaLUT },
  portra: { name: "Portra", lut: portraLUT },
};

export default function App() {
  const [original, setOriginal] = useState(null);
  const [currentPreset, setCurrentPreset] = useState("classic_chrome");
  const [sliders, setSliders] = useState({ grain: 20, exposure: 0, tint: 0 });
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const canvasRef = useRef();

  const handleSliderChange = (key, val) => setSliders({ ...sliders, [key]: val });

  const handlePresetChange = (preset) => {
    if (!isPremium && (preset === "velvia" || preset === "portra")) {
      setPremiumOpen(true);
      return;
    }
    setCurrentPreset(preset);
  };

  const handlePurchase = () => {
    setIsPremium(true);
    setPremiumOpen(false);
    alert("Premium unlocked! 🎉");
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "film_simulation.jpg";
      link.click();
    }, "image/jpeg", 0.95);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">React WebGL Film Simulator</h1>
      <UploadDropzone onUpload={setOriginal} />
      <FilmControls presets={filmPresets} current={currentPreset} onChange={handlePresetChange} />
      <Sliders values={sliders} onChange={handleSliderChange} />

      {original && (
        <div className="mt-6 w-full h-96 bg-black rounded overflow-hidden relative">
          <Canvas ref={canvasRef}>
            <LUTPlane
              imageSrc={original}
              lutSrc={filmPresets[currentPreset].lut}
              sliders={sliders}
            />
          </Canvas>
          <button
            className="absolute bottom-2 right-2 bg-blue-600 text-white px-4 py-2 rounded shadow"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      )}

      <PremiumModal open={premiumOpen} onClose={() => setPremiumOpen(false)} onPurchase={handlePurchase} />
    </div>
  );
}
