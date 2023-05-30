/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background.png')",
        gradient: 'linear-gradient(89.86deg, #9572FC 20.00%, #43E7AD 65.00%, #E1D55D 20.00%)',
        'game-gradient': 'linear-gradient(188deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.88%)',
      }
    },
  },
  plugins: [],
}

