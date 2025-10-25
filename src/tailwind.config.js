/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "!./src/components/ServicesPage/**"
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Share Tech Mono', 'monospace'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'electrolize': ['Electrolize', 'sans-serif'],
      },
      colors: {
        cyber: {
          blue: '#00ffff',
          pink: '#ff00ff',
          green: '#00ff00',
          dark: '#0a0a0a',
        }
      },
      animation: {
        'glitch': 'glitch 0.6s ease-in-out infinite',
        'scan-line': 'scanLineMove 4s linear infinite',
        'matrix': 'matrix 20s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { 
            transform: 'translate(0) scale(1)',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
            filter: 'hue-rotate(0deg)',
          },
          '25%': { 
            transform: 'translate(-2px, 1px) scale(1.005)',
            textShadow: '2px -1px rgba(255, 0, 255, 0.3), -2px 1px rgba(0, 255, 0, 0.3), 0 0 25px #0ff',
            filter: 'hue-rotate(3deg)',
          },
          '50%': { 
            transform: 'translate(1px, -1px) scale(0.998)',
            textShadow: '-1px 1px rgba(255, 0, 255, 0.3), 1px -1px rgba(0, 255, 0, 0.3), 0 0 30px #f0f',
            filter: 'hue-rotate(-3deg)',
          },
          '75%': { 
            transform: 'translate(-1px, 1px) scale(1.002)',
            textShadow: '1px -1px rgba(255, 0, 255, 0.3), -1px 1px rgba(0, 255, 0, 0.3), 0 0 25px #0ff',
            filter: 'hue-rotate(2deg)',
          },
        },
        scanLineMove: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.97' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
            opacity: '1',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.8)',
            opacity: '0.9',
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}