/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-deep': '#1e3a0f',
        'green-forest': '#2d5016',
        'green-mid': '#4a7c2f',
        'green-light': '#7aad52',
        'green-pale': '#e8f0e0',
        'gold': '#c9a84c',
        'gold-light': '#e8d49a',
        'off-white': '#f9f7f4',
        'warm-white': '#fdfcfa',
        'nadi-dark': '#1a1a18',
        'nadi-mid': '#4a4a46',
        'nadi-light': '#8a8a84',
      },
      fontFamily: {
        'serif': ['Cormorant Garamond', 'serif'],
        'sans': ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

