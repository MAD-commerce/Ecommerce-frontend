import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.jpg'],
  build: {
    outDir: 'dist', // Asegúrate de que el directorio de salida esté configurado
  },
})
