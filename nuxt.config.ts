export default defineNuxtConfig({

  compatibilityDate: '2026-09-20',

  srcDir: '.',

  devtools: {
    enabled: true
  },

  app: {
    head: {
      title: 'Atelier POS — Boutique Fabric & Tailoring System',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Kantumruy+Pro:ital,wght@0,300..700;1,300..700&family=Koulen&family=Moul&family=Noto+Sans+Khmer:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap'
        }
      ]
    }
  },

  devServer: {
    port: 3000
  },

  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: ['en', 'km', 'zh'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: '~/i18n.config.ts'
  },

  css: [
    '~/assets/css/main.css',
    'sweetalert2/dist/sweetalert2.min.css'
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },

  colorMode: {
    classSuffix: '',
    fallback: 'light',
    preference: 'light'
  }

})