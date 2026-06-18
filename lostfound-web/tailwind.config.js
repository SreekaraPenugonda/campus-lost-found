/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vignan: {
          green: '#7FFF00',    // Chartreuse Green
          dark: '#1a365d',     // Navy/Dark Blue
          light: '#f0fdf4',    // Light green for backgrounds
          white: '#ffffff',
          accent: '#7FFF00',
        },
        primary: {
          DEFAULT: '#7FFF00',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}