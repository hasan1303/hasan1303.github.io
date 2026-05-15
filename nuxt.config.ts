export default defineNuxtConfig({
  compatibilityDate: '2026-05-15',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxt/image',
  ],

  // Google Fonts — self-hosted, zero render blocking
  googleFonts: {
    families: {
      Syne: [400, 500, 600, 700, 800],
      'DM Mono': { ital: [400], wght: [400, 500] },
      'Instrument Sans': { ital: [400], wght: [400, 500] },
    },
    display: 'swap',
    preload: true,
    download: true,
    inject: true,
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'portfolio-color-mode',
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
  },

  content: {
    highlight: {
      theme: { default: 'github-dark', light: 'github-light' },
      langs: ['go', 'typescript', 'javascript', 'vue', 'python', 'bash', 'sql', 'yaml', 'json'],
    },
  },

  image: {
    quality: 85,
    format: ['webp'],
  },

  runtimeConfig: {
    strapiToken: process.env.STRAPI_TOKEN || '',
    strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
    resendApiKey: process.env.RESEND_API_KEY || '',
    emailFrom: process.env.EMAIL_FROM || '',
    emailTo: process.env.EMAIL_TO || '',
    public: {
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://hasan1303.github.io',
      siteName: 'Hasan',
      siteDescription: 'Frontend Developer specializing in Vue.js, Nuxt 3, and Tailwind CSS.',
      githubUser: 'hasan1303',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Hasan — Frontend Developer',
      meta: [
        { name: 'description', content: 'Frontend Developer specializing in Vue.js, Nuxt 3, and Tailwind CSS.' },
        { name: 'author', content: 'Hasan' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Hasan Portfolio' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/contact': { prerender: true },
    '/projects': { prerender: true },
    '/projects/**': { prerender: true },
    '/blog': { swr: 1800 },
    '/blog/**': { swr: 3600 },
  },

  typescript: {
    strict: false,
    typeCheck: false,
  },
})
