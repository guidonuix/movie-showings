import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
export default defineConfig({
  plugins: [
    tanstackRouter({
      // <-- This is the router compiler
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    // ...,
  ],
});
