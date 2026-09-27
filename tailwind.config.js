/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#FBFCFF',
        'bg-surface': '#FFFFFF',
        'bg-muted': '#E8ECF8',
        'text-primary': '#1F2D5B',
        'text-secondary': '#4A5578',
        'border': '#D5DCF0',
        'border-subtle': '#E8ECF8',
        'accent': '#7B2CF9',
        'accent-hover': '#651AE6',
        'accent-light': '#F3EBFF',
        'thistle': '#D8BFD8',
        'thistle-light': '#F7EFF7',
        'amber-gold': '#F59E0B',
        'amber-hover': '#D97706',
        'navy-deep': '#141D3B',
        'navy-primary': '#1F2D5B',
        'navy-surface': '#25356C',
        'success': '#10B981',
        // High-tech industrial dark engineering tokens using user's navy/purple palette
        'slate-engineering': '#141D3B',
        'slate-surface': '#1F2D5B',
        'slate-card': '#27386E',
        'slate-border': '#3B4E8C',
        'cyan-electric': '#38BDF8',
      },
      fontFamily: {
        display: ['Outfit', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'blueprint-grid': "radial-gradient(rgba(138, 106, 56, 0.12) 1px, transparent 1px)",
        'dark-grid': "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
      },
      maxWidth: {
        'content': '1280px',
      },
    },
  },
  plugins: [],
}
