import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
  allowedHosts: ['ee27-2402-a00-162-3e9a-68e2-fd3f-4c30-7d62.ngrok-free.app'],
  },
})