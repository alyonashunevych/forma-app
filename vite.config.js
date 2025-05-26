import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: "/forma-app/",
  resolve: {
    alias: {
      src: "/src",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/client/utils/variables.scss";
        `,
      },
    },
  },
});