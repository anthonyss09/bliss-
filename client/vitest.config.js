import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["vitestSetup.ts"],
    env: loadEnv("", process.cwd(), ""),
  },
});
``;
