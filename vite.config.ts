import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // OneDrive can miss filesystem events; polling keeps Tailwind and React in sync.
    watch: { usePolling: true, interval: 300 },
    host: '127.0.0.1',
    port: 5174,
    strictPort: true,
    proxy: {
      '/auth': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
      },
    },
  },
})
