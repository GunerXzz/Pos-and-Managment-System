export default defineNuxtConfig({

  compatibilityDate: '2026-09-20',

  srcDir: '.',

  devtools: {
    enabled: true
  },

  devServer: {
    port: 3008
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