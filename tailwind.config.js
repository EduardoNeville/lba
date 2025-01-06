/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8C2851',
        'lt-primary': '#9c6079',
        'lt-secondary': '#CEDBE5',
      },
      width: {
        'icon': '2rem'
      },

    },
  },
  plugins: [],
}

