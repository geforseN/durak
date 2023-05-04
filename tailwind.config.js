/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-debug-screens"),
    require("@savvywombat/tailwindcss-grid-areas")
  ],
  daisyui: {
    themes: ["garden"],
  },
};
