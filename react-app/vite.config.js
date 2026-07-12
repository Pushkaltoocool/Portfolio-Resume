import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow serving parent workspace (fonts resolved from parent node_modules)
      allow: [path.resolve(__dirname, '..')],
    },
    proxy: {
      // Local stand-in for Vercel serverless functions (scripts/dev-api.mjs)
      '/api': `http://127.0.0.1:${process.env.API_DEV_PORT || 8787}`,
    },
  },
})
