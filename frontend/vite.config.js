import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 3000,
      cors: true,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "setupTests.js",
      coverage: {
        functions: 100,
        lines: 100,
        statements: 100,
        branches: 100,
      },
    },
  };
});
