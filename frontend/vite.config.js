import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  	tailwindcss(),
  ],

  server: {
    https: {
      key: fs.readFileSync(path.resolve('./certs/key.pem')),
      cert: fs.readFileSync(path.resolve('./certs/cert.pem')),
    },
    proxy: {
      '/api': {
        target: 'https://api:3000',
        secure: false,
      },
      '/gameroute': {
        target: 'https://api:3000',
        secure: false,
      },
      '/public': {
        target: 'https://api:3000',
        secure: false,
      },
      '/ws/story': {
        target: 'https://ai:8000',
        ws: true,
        secure: false,
      },
      '/ws/chat': {
        target: 'wss://api:3000',
        ws: true,
        secure: false,
        changeOrigin: true,
      },
    },
	watch: {
      ignored: ['**/bdd.json']
    }
  },
})
