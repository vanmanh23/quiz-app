/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'secondary': '#f7f7f7',
      },
      colors:{
        'primary': '#ffff',
        'third': '#4052f7'
      }
    },
  },
  plugins: [],
}