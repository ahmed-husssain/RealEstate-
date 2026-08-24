/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          bg: '#f5efe6',
          card: '#fbf6f0',
          'card-alt': '#fcf8f1',
          dark: '#1F1B16',
          mahogany: '#5c3822',
          moss: '#2e3a2f',
          surface: '#847666',
          primary: '#D8CEBE',
          secondary: '#D7CBBB',
          accent: '#DDD2C2',
          'text-light': '#F8F4ED',
          'text-secondary': '#7e7365',
          'text-muted': '#61564a',
          border: '#d8cebe',
          'border-stone': '#d7cbbb',
          'border-moss': '#6E7A67',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'BlinkMacSystemFont', '-apple-system', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '1.75rem': '1.75rem',
      },
      boxShadow: {
        'inset-highlight': 'inset 0 1px 0 rgba(255, 255, 255, 0.75)',
        'stratified': '0 20px 40px -15px rgba(31, 27, 22, 0.05), 0 0 0 1px rgba(216, 206, 190, 0.6)',
        'stratified-hover': '0 25px 50px -12px rgba(31, 27, 22, 0.09), 0 0 0 1px rgba(216, 206, 190, 0.95)',
        'glass-glow': '0 8px 32px 0 rgba(31, 27, 22, 0.06)',
      },
      letterSpacing: {
        'label': '0.18em',
      },
      maxWidth: {
        '7xl': '80rem', // 1280px
      }
    },
  },
  plugins: [],
};
