module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        themeRed: '#7A1A24', // Lighter maroon for buttons/active items
        themeDarkRed: '#3E0B11', // Very dark maroon for sidebar
        themeGold: '#B58739', // Figma gold
        themeWhite: '#F8F9FA',
        themeDark: '#121212',
      }
    },
  },
  plugins: [],
}