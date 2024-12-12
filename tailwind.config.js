/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    'node_modules/tailvue/dist/tailvue.es.js'
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#1e73be",

          "secondary": "#d1d5db",

          "accent": "#1dcdbc",

          "neutral": "#2b3440",

          "base-100": "#ffffff",

          "info": "#3abff8",

          // "success": "#36d399",

          "warning": "#fbbd23",

          "error": "#f87272",
        },
      },
    ],
  },
  theme: {
    extend: {
      container: {
        center: true
      }
    },
  },
  plugins: [require("daisyui")],
}