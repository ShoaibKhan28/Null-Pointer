/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#080c16',
          card: '#0f172a',
          surface: '#131e36',
          border: '#1e293b',
          muted: '#64748b',
        },
        chess: {
          primary: '#3b82f6',
          accent: '#60a5fa',
          win: '#22c55e',
          loss: '#ef4444',
          draw: '#f59e0b',
          boardLight: '#dee3e6',
          boardDark: '#8ca2ad',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}