import React from "react";
import { Slider } from "@mui/material";

export default function Sliders({ values, onChange }) {
  return (
    <div className="mt-4 flex flex-col gap-4 w-full max-w-md">
      <div>
        <p>Grain: {values.grain}</p>
        <Slider
          value={values.grain}
          min={0}
          max={100}
          onChange={(e, val) => onChange("grain", val)}
        />
      </div>
      <div>
        <p>Exposure: {values.exposure}</p>
        <Slider
          value={values.exposure}
          min={-2}
          max={2}
          step={0.01}
          onChange={(e, val) => onChange("exposure", val)}
        />
      </div>
      <div>
        <p>Tint: {values.tint}</p>
        <Slider
          value={values.tint}
          min={-1}
          max={1}
          step={0.01}
          onChange={(e, val) => onChange("tint", val)}
        />
      </div>
    </div>
  );
}
