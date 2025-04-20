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
          50: '#CAF0F8',
          100: '#ADE8F4',
          200: '#90E0EF',
          300: '#48CAE4',
          400: '#00B4D8',
          500: '#0096C7',
          600: '#0077B6',
          700: '#023E8A',
          800: '#03045E',
          900: '#020420',
        },
        warm: {
          50: '#FFF8F1',
          100: '#FFE8D6',
          200: '#FFD8B4',
          300: '#FFC993',
          400: '#FFB703',
          500: '#FB8500',
        },
        cool: {
          50: '#F0FCFF',
          100: '#CAF0F8',
          200: '#ADE8F4',
          300: '#90E0EF',
          400: '#48CAE4',
          500: '#00B4D8',
        },
      },
    },
  },
  plugins: [],
}