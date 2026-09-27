/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#F8F7F4',
        'bg-surface': '#FFFFFF',
        'bg-muted': '#EFEDE7',
        'text-primary': '#1B1C1F',
        'text-secondary': '#5B5F66',
        'border': '#DEDBD3',
        'accent': '#8A6A38',
        'accent-hover': '#6F5429',
        'success': '#3E6B52',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'content': '1280px',
      },
    },
  },
  plugins: [],
}
