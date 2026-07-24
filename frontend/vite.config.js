import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@icons': path.resolve(__dirname, './src/assets/icons'), 
      '@pages': path.resolve(__dirname, './src/pages'),
      '@data': path.resolve(__dirname, './src/data'),
      '@schemas': path.resolve(__dirname, './src/schemas'),
      '@utils': path.resolve(__dirname, './src/utils'),
      
    },
  },
})