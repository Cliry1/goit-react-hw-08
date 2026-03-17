import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
  sourcemap: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://pet-proj-vjtd.onrender.com',
        // target: 'https:/localhost:3000',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
