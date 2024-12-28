/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0a0f1c',
          900: '#0f172a',
          800: '#1e293b',
        },
        light: {
          secondary: '#94a3b8',
        },
      },
      fontFamily: {
        'oswald': ['Oswald', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        'body': ['Segoe UI', 'sans-serif'],
      },
      backgroundColor: {
        'dark-card': '#020c20',
        'main': '#01040d'
      }
    },
  },
  plugins: [],
}