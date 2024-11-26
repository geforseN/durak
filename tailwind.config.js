const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./{app,layers}/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: "310px",
      xs: "475px" /* 
      'sm': '640px'
      'md': '768px'
      'lg': '1024px'
      'xl': '1280px'
      '2xl': '1536px' */,
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-debug-screens"),
    require("@savvywombat/tailwindcss-grid-areas"),
  ],
  daisyui: {
    themes: ["corporate"],
  },
};
