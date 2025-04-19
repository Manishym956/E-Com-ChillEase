// apps/client/tailwind.config.js
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
          50: '#eef9ff',
          100: '#dcf2ff',
          200: '#b3e7ff',
          300: '#5cd9ff',
          400: '#36d1ff',
          500: '#0cbdff',
          600: '#0097d6',
          700: '#0077ab',
          800: '#00638c',
          900: '#005170',
        },
      },
    },
  },
  plugins: [],
}