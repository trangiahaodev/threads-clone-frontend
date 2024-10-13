import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Get rid of the CORS error
    proxy: {
      "/api": {
        target: `${import.meta.env.MERN_APP_BACKEND_BASEURL}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
