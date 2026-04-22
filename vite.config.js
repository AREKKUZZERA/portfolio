import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/github-repos": {
        target: "https://api.github.com",
        changeOrigin: true,
        rewrite: () => "/users/AREKKUZZERA/repos?per_page=50&sort=updated",
      },
    },
  },
});
