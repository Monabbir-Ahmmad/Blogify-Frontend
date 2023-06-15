import { defineConfig, loadEnv } from "vite";

import http from "https";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./testSetup.js",
    },
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
  };
});
