import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  
  base: '/',
  
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'utils-vendor': ['validator', 'dompurify']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : []
  },
  
  server: {
    port: 3000,
    open: true
  },
  
  preview: {
    port: 4173,
    open: true
  }
}))
