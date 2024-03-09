/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./src/**/*.{html,js}",
    // "./node_modules/tw-elements/dist/js/**/*.js"
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animated'),
    require('flowbite/plugin')
    // require("tw-elements/dist/plugin.cjs")
    // require('daisyui')
  ],
}

