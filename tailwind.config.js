/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'zesta-regular': "Zesta_Regular",
        'zesta-bold': "Zesta_Bold",
        'cocogothic': "CocoGothic",
      },
      colors: {
        'primary': '#8C2851',
        'lt-primary': '#9c6079',
        'lt-secondary': '#CEDBE5',
      },
      width: {
        'icon': '2rem'
      },
      padding: {
        'bdr': '10rem'
      }
    },
  },
  plugins: [],
}

