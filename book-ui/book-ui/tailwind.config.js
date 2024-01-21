/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'main-bg-color': '#E6E8E6',
        'main-text-color': '#3F403F',
        'hover-text-color': '#498C8A',
        'submit-btn-color': '#3772FF'
      },
      spacing: {
        '300': '300px',
        '200': '200px',
        '250': '250px',
        '800': '800px',
        '19': '19rem',
        '400': '400px',
        '530': '530px'
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
