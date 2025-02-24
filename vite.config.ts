import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    define: {
      'process.env': process.env,
    },
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@store": path.resolve(__dirname, "src/store"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
});
