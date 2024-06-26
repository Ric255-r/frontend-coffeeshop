/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: {

    content: [
      "./src/**/*.{html,js}",
      // "./node_modules/tw-elements/dist/js/**/*.js"
      "./node_modules/flowbite/**/*.js",
      './index.html', './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    options: {
      safelist: ['outline-orange']
    }
  },

  theme: {
    extend: {
      animation: {
        shine: "shine 1.5s",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require('flowbite/plugin'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    // require("tw-elements/dist/plugin.cjs")
    // require('daisyui')
  ],
}

