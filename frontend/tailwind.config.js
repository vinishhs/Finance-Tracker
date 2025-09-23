/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'background-light': 'var(--background-light)',
        'background-dark': 'var(--background-dark)',
        primary: 'var(--primary)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};