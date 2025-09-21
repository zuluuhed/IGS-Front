// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://hdep.browserselect.ir",
        changeOrigin: true,
        secure: false,
        timeout:60000,
        configure: (proxy: any) => {
          proxy.on("proxyReq", (proxyReq: any, req: any) => {
            const incomingAuth = req.headers["authorization"] || req.headers["Authorization"];
            if (incomingAuth) {
              proxyReq.setHeader("authorization", incomingAuth);
            }
          });
        },
      },
    },
  },
});
