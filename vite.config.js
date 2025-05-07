import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
  allowedHosts: ['f456-150-107-232-83.ngrok-free.app'],
  },
})