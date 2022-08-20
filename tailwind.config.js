module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mygreen: '#029F08'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
