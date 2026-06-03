import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/TP_ARQYSO/',
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'burptest.local',
      '192.168.0.73',
      'unpreying-heliographically-basilia.ngrok-free.dev'
    ],
  }, // ← cierre server
}) 
