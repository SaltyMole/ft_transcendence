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
      key: fs.readFileSync(path.resolve('../api/certs/key.pem')),
      cert: fs.readFileSync(path.resolve('../api/certs/cert.pem')),
    },
    proxy: {
      '/api': {
        target: 'https://localhost:3000',
        secure: false,
      },
      '/gameroute': {
        target: 'https://localhost:3000',
        secure: false,
      },
      '/public': {
        target: 'https://localhost:3000',
        secure: false,
      },
      '/ws/story': {
        target: 'https://localhost:8000',
        ws: true,
        secure: false,
      },
    },
	watch: {
      ignored: ['**/bdd.json']
    }
  },
})
