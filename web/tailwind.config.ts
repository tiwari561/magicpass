import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"Cabinet Grotesk Placeholder"', 'ui-sans-serif', 'sans-serif'],
        body:    ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:    ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* Brand palette */
        primary: {
          DEFAULT: '#00D084',
          light:   '#E6FAF3',
          dark:    '#00A869',
        },
        success: {
          DEFAULT: '#00D084',
          light:   '#E6FAF3',
        },
        error: {
          DEFAULT: '#E03E3E',
          light:   'rgba(224,62,62,0.10)',
        },
        warning: {
          DEFAULT: '#C84C31',
          light:   'rgba(200,76,49,0.10)',
        },
        ink:        '#1A1D1C',
        slate:      '#525754',
        sandstone:  '#F9F7F4',
        bone:       '#EBE7E0',
        'bone-deep':'#DED8CC',
        clay:       '#C84C31',
        /* Override gray → warm ink scale */
        gray: {
          50:  '#F9F7F4',
          100: '#EBE7E0',
          200: '#DED8CC',
          300: '#C8C4BC',
          400: '#9A9894',
          500: '#525754',
          600: '#525754',
          700: '#3A3D3C',
          800: '#2A2D2C',
          900: '#1A1D1C',
          950: '#111312',
        },
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight:   '-0.025em',
        snug:    '-0.015em',
        widest:  '0.22em',
      },
    },
  },
  plugins: [],
};

export default config;
