/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F0FF',
          100: '#EDE0FF',
          200: '#D4BFFF',
          300: '#B894FF',
          400: '#9B6AFF',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#3B0F7A',
          950: '#1A0533',
        },
        accent: {
          50: '#FFFCF0',
          100: '#FFF8E0',
          200: '#FFEBB3',
          300: '#FFD980',
          400: '#FFC74D',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#FEF7E6',
          hover: '#FFFCF5',
        },
        dark: {
          50: '#1A1225',
          100: '#2A1F3D',
          200: '#3A2D50',
          300: '#5A4B6B',
          400: '#7A6B8A',
          500: '#A99BB3',
          600: '#C9BDD1',
          700: '#E0D7E6',
          800: '#F0EBF2',
          900: '#FFFFFF',
          950: '#FDF8F0',
        },
        cream: {
          DEFAULT: '#FDF8F0',
          light: '#FFFCF5',
          dark: '#F5EDE0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'orb': 'orbFloat 12s ease-in-out infinite',
        'orb-reverse': 'orbFloat 15s ease-in-out infinite reverse',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(124, 58, 237, 0.3), 0 0 20px rgba(124, 58, 237, 0.1)' },
          '100%': { boxShadow: '0 0 10px rgba(124, 58, 237, 0.5), 0 0 40px rgba(124, 58, 237, 0.2)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(10px, -15px) scale(1.05)' },
          '50%': { transform: 'translate(-5px, -25px) scale(0.95)' },
          '75%': { transform: 'translate(-15px, -10px) scale(1.02)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
