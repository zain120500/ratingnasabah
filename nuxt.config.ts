export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: "PUGINDO GADAI | Pusat Gadai Indonesia"
    }
  },
  css: [
    '~/assets/css/main.css',
    'vue3-easy-data-table/dist/style.css',
    'vue-multiselect/dist/vue-multiselect.css',
    '@hennge/vue3-pagination/dist/vue3-pagination.css',
    'vue3-toastify/dist/index.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    'nuxt-icon',
    'nuxt-headlessui',
    '@pinia/nuxt',
    '@tailvue/nuxt',
    "nuxt-rating"
  ],
  pinia: {
    autoImports: ['defineStore']
  },
  imports: {
    dirs: ["./stores"]
  },
  headlessui: {
    prefix: 'H'
  },
})