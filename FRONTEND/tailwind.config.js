import('tailwindcss').Config


export default {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}', // ← adjust based on your project structure
  ],
    plugins: [
      require('tailwind-scrollbar-hide'),
    ],
    theme: {
      extend: {
        zIndex: {
          '100': '100',
        }
      }
    }
  }