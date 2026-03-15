// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        rose: {
          DEFAULT: '#C08A8A',
        },
        pearl: '#FAFAFA',
        charcoal: '#2C2C2C',
        slate: '#6B7280',
        silver: '#E5E7EB',
        sage: '#7A9A8A',
        crimson: '#9A3E3E',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
