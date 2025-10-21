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
        // Earthy Palette
        'terracotta': '#D2691E',
        'deep-brown': '#3E2723',
        'clay': '#A0522D',
        'gold': '#FFD700',
        // Background and Text
        'ivory-sand': '#F5F5DC',
        'saddle-brown': '#8B4513',
        // Legacy colors (for compatibility)
        'sunset-amber': '#D97706',
        'savannah-gold': '#F59E0B',
        'deep-charcoal': '#1F2937',
        'emerald': '#065F46',
        'royal-indigo': '#312E81',
        'crimson': '#7F1D1D'
      },
      fontFamily: {
        'display': ['Playfair Display', 'Clash Display', 'DM Serif Display', 'serif'],
        'sans': ['Inter', 'Poppins', 'sans-serif'],
        'cultural': ['Noto Sans African', 'Ubuntu', 'sans-serif']
      },
      fontSize: {
        'h1-desktop': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h1-mobile': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2-desktop': ['1.5rem', { lineHeight: '1.7', fontWeight: '400' }],
        'h2-mobile': ['1.375rem', { lineHeight: '1.7', fontWeight: '400' }],
        'base': ['1rem', { lineHeight: '1.5' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
      },
      maxWidth: {
        'container-mobile': '100%',
        'container-tablet': '48rem', // 768px
        'container-desktop': '75rem', // 1200px
        'container-large': '90rem', // 1440px
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
        'gradient-heritage': 'linear-gradient(135deg, #D2691E 0%, #A0522D 100%)',
        'gradient-sunset': 'linear-gradient(to right, #D2691E, #FFD700, #A0522D)',
        'hero-overlay': 'linear-gradient(135deg, rgba(245, 245, 220, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
      },
    },
  },
  plugins: [],
}
