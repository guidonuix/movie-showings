/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { coverageConfigDefaults } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tanstackRouter(), react(), tailwindcss(),],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
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
