/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      width: {
        266: '266px',
        320: '320px'
      },
      height: {
        'screen-80': '80vh'
      },
      colors: {
        amber: '#F59E0B',
        brown: {
          50: '#f3efed',
          100: '#d9ccc7',
          200: '#c6b4ac',
          300: '#ad9186',
          400: '#9d7c6e',
          500: '#845b4a',
          600: '#785343',
          700: '#5e4135',
          800: '#493229',
          900: '#37261f'
        },
        yellow: {
          50: '#fcf6ec',
          100: '#f7e2c3',
          200: '#f3d5a6',
          300: '#eec17d',
          400: '#eab564',
          500: '#e5a33d',
          600: '#d09438',
          700: '#a3742b',
          800: '#7e5a22',
          900: '#60441a'
        }
      }
    }
  },
  plugins: []
}
