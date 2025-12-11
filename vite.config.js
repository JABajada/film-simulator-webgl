import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/film-simulator-webgl/",
  assetsInclude: ["**/*.cube"],   // <-- THIS is the important line
});
