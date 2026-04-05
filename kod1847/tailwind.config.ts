import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B89860',
          light: '#F5EFDF',
          mid: '#E8D9B8',
          mute: 'rgba(184,152,96,0.25)',
          '10': 'rgba(184,152,96,0.1)',
        },
        ink: '#08080A',
        stone: '#9A958B',
        linen: '#F5F0E8',
        'linen-warm': '#FAF6EF',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        bodoni: ['Bodoni Moda', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      fontSize: {
        'h1-mobile': ['48px', { lineHeight: '1.15', fontWeight: '300' }],
        'h1-desktop': ['64px', { lineHeight: '1.15', fontWeight: '300' }],
        'h2-mobile': ['36px', { lineHeight: '1.2', fontWeight: '300' }],
        'h2-desktop': ['42px', { lineHeight: '1.2', fontWeight: '300' }],
        caption: ['9px', { lineHeight: '1.4', letterSpacing: '0.3em' }],
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
      maxWidth: {
        site: '1200px',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(.16,1,.3,1)',
        smooth: 'cubic-bezier(.4,0,.2,1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'underline-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 1.1s cubic-bezier(.16,1,.3,1) forwards',
        'scale-in': 'scale-in 0.8s cubic-bezier(.16,1,.3,1) forwards',
        'underline-grow': 'underline-grow 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
