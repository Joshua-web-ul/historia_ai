/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'sunset-amber': '#D97706',
        'savannah-gold': '#F59E0B',
        'deep-charcoal': '#1F2937',
        'ivory-sand': '#FFF8E7',
        // Secondary Colors
        'terracotta': '#B45309',
        'emerald': '#065F46',
        'royal-indigo': '#312E81',
        'crimson': '#7F1D1D'
      },
      fontFamily: {
        'display': ['Clash Display', 'DM Serif Display', 'sans-serif'],
        'sans': ['Inter', 'Poppins', 'sans-serif'],
        'cultural': ['Noto Sans African', 'Ubuntu', 'sans-serif']
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'gradient-heritage': 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
        'gradient-sunset': 'linear-gradient(to right, #D97706, #F59E0B, #B45309)'
      },
    },
  },
  plugins: [],
}
