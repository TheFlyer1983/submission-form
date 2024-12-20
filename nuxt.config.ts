// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-01',
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    '@nuxt/test-utils/module'
  ],
  css: ['~/assets/css/main.pcss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui'
  }
});