/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { coverageConfigDefaults } from "vitest/config";
// export default defineConfig({
//   plugins: [
//     tanstackRouter({
//       // <-- This is the router compiler
//       target: "react",
//       autoCodeSplitting: true,
//     }),
//     react(),
//   ],
// });

export default defineConfig({
  plugins: [tanstackRouter(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    maxConcurrency: 10,
    coverage: {
      reporter: ["text"],
      provider: "v8",
      exclude: [
        "**/*.stories.ts?(x)",
        "**/*.mocks.ts?(x)",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
