import React from "react";
import { MenuItem, Select } from "@mui/material";

export default function FilmControls({ presets, current, onChange }) {
  return (
    <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
      <Select value={current} onChange={(e) => onChange(e.target.value)}>
        {Object.keys(presets).map((key) => (
          <MenuItem key={key} value={key}>
            {presets[key].name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
