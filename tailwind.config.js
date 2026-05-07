/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        h2: {
          300: '#90E0EF',
          400: '#48CAE4',
          500: '#00B4D8',
          600: '#0096C7',
          700: '#0077B6',
          800: '#023E8A',
          900: '#03045E',
        },
        lift: '#7CFFB2',
        peak: '#B8FFE5',
        depleted: '#FF6B6B',
        building: '#FFB84D',
        optimised: '#7CFFB2',
        bg: '#05080F',
        surface: '#0B1220',
        surface2: '#121A2B',
        border: '#1E2A44',
        text: '#F5F8FF',
        'text-dim': '#8A97B5',
      },
      fontFamily: {
        display: ['System'],
        body: ['System'],
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        lg: '20px',
        xl: '28px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};
