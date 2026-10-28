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
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Kantumruy Pro"', '"Noto Sans Khmer"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', '"Kantumruy Pro"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Kantumruy Pro"', 'monospace'],
        khmer: ['"Kantumruy Pro"', '"Noto Sans Khmer"', 'sans-serif'],
      },
      colors: {
        themeRed: '#7A1A24', // Lighter maroon for buttons/active items
        themeDarkRed: '#3E0B11', // Very dark maroon for sidebar
        themeGold: '#C5A059', // Refined Champagne gold
        themeWhite: '#FBF9F5', // Warm Atelier Ivory
        themeDark: '#131114', // Warm Obsidian Velvet
        surfaceCanvas: '#131114',
        surfaceCard: '#1C181C',
        surfaceInput: '#262126',
        atelier: {
          ivory: '#FBF9F5',
          paper: '#F4EFEA',
          border: '#E8E1D7',
          dark: '#131114',
          card: '#1C181C',
          cardHover: '#252026',
          borderDark: '#2E272F',
          red: '#7A1A24',
          redDark: '#4F1017',
          redLight: '#94222E',
          gold: '#C5A059',
          goldLight: '#E6C98A',
          goldDark: '#9C7A35',
        }
      }
    },
  },
  plugins: [],
}