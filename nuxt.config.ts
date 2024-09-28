// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@vueuse/nuxt'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  typescript: {
    typeCheck: true,
  },
  postcss: {
    plugins: {
      'autoprefixer': {},
      'cssnano': {},
      'postcss-preset-env': {},
    },
  },
})
