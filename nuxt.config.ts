// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/style/main.scss',
  ],
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

})
