/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        besege: {
          violet: '#584EE3',
          'violet-light': '#7E76F4',
          'violet-dark': '#3C339E',
          'violet-soft': '#EEEBFF',
          canvas: '#FAF7EE',
          'canvas-subtle': '#F4EFE3',
          'canvas-dark': '#ECE5D5',
          black: '#121214',
          charcoal: '#1E1E22',
          muted: '#71717A',
          rose: '#E8A2B8',
          'rose-neon': '#FF2D8D',
          gold: '#C9A86A',
          'gold-light': '#E8D49E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'museum': '0 20px 50px -15px rgba(18, 18, 20, 0.08), 0 0 1px 1px rgba(18, 18, 20, 0.04)',
        'museum-hover': '0 30px 60px -12px rgba(88, 78, 227, 0.12), 0 10px 20px -5px rgba(18, 18, 20, 0.06)',
        'double-bezel': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), 0 10px 30px -10px rgba(0, 0, 0, 0.05)',
      },
      transitionTimingFunction: {
        'spring-smooth': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'spring-bouncy': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
};
