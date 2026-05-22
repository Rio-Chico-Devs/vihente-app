import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        // Skip Babel plugins not needed — keeps transform lean
        plugins: [],
      },
    }),
  ],

  base: '/',

  optimizeDeps: {
    // Explicitly list CJS/heavy deps so Vite pre-bundles them once
    // and never rescans on subsequent cold starts
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'dompurify',
      'validator',
      'vanilla-cookieconsent',
    ],
  },

  server: {
    port: 3000,
    open: true,
    warmup: {
      // Pre-transform these files during startup instead of on first request
      clientFiles: [
        './src/main.jsx',
        './src/App.jsx',
        './src/components/sections/Hero/Hero.jsx',
        './src/components/sections/Showroom/Showroom.jsx',
        './src/components/sections/Showroom/SimPages/BarbiereSim.jsx',
        './src/components/sections/Showroom/SimPages/FotografoSim.jsx',
        './src/components/sections/Showroom/SimPages/PsicologoSim.jsx',
        './src/components/sections/Showroom/SimPages/SaloneSim.jsx',
        './src/components/sections/Showroom/SimPages/EcommerceSim.jsx',
        './src/components/sections/Showroom/SimPages/AvvocatiSim.jsx',
        './src/components/sections/Showroom/SimPages/CampagnaSim.jsx',
        './src/components/sections/Showroom/SimPages/AgenziaViaggioSim.jsx',
        './src/components/sections/Showroom/SimPages/ImmobiliareSim.jsx',
      ],
    },
  },

  build: {
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'utils-vendor': ['validator', 'dompurify'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },

  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },

  preview: {
    port: 4173,
    open: true,
  },
}))
