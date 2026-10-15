/** @type {import('tailwind').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F3EEE5',
        parchment: '#ECE5D8',
        ink: '#241E18',
        // The opportunities box brown — the same family as ink, a step lighter
        // ("un marron menos oscuro", client part 2).
        umber: '#3E3227',
        taupe: '#7D7266',
        hairline: '#D9D0C0',
        oxblood: '#6D2A24',
        maroon: '#4A1D1A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
