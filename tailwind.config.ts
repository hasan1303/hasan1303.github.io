import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B1120',
        paper: '#F5F3EE',
        surface: '#1E293B',
        edge: '#334155',
        muted: '#94A3B8',
        vue: {
          DEFAULT: '#42B883',
          dark: '#04342C',
          soft: '#9FE1CB',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Instrument Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      maxWidth: {
        'content': '720px',
        'wide': '1200px',
      },
      lineHeight: {
        'extra-tight': '1.05',
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config
