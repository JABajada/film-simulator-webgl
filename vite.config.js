import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/film-simulator-webgl/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("luts") || id.includes("assets")) {
            return "assets";
          }
        },
      },
    },
  },
  assetsInclude: ["**/*.cube"],
});
