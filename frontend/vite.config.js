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
        "/api": {
          target: env.VITE_API_HOST,
          changeOrigin: true,
          secure: false,
          agent: new http.Agent(),
        },
      },
    },
  };
});
