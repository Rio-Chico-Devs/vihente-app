import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  
  // Base path per GitHub Pages
  base: mode === 'production' ? '/vihente-app/' : '/',
  
  // Ottimizzazioni build
  build: {
    // Rimuovi console.log e debugger in produzione
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Chunking manuale per ottimizzare il caricamento
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'utils-vendor': ['validator', 'dompurify']
        }
      }
    },
    // Aumenta il limite di warning per chunks (opzionale)
    chunkSizeWarningLimit: 1000
  },
  
  // Rimuovi console.log in produzione
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : []
  },
  
  // Ottimizzazioni server dev
  server: {
    port: 3000,
    open: true
  },
  
  // Preview config
  preview: {
    port: 4173,
    open: true
  }
}))