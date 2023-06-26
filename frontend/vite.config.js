import { defineConfig, loadEnv } from "vite";

import http from "https";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        [env.VITE_API]: {
          target: env.VITE_API_HOST,
          changeOrigin: true,
          secure: true,
          agent: new http.Agent(),
        },
      },
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
