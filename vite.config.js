import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // escucha en 0.0.0.0 para ser accesible desde fuera del contenedor
    port: 5173,
    watch: {
      usePolling: true,  // necesario para el hot reload con volúmenes en Windows
    },
  },
})