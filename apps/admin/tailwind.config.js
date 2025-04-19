// apps/admin/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf8ff',
          100: '#dcf0ff',
          200: '#b3e0ff',
          300: '#5cc8ff',
          400: '#36bcff',
          500: '#0ca8ff',
          600: '#0088d6',
          700: '#0069ab',
          800: '#00568c',
          900: '#004670',
        },
      },
    },
  },
  plugins: [],
}
