import screens from "./tailwind.screens";
import daisyui from "daisyui";
import debugScreens from "tailwindcss-debug-screens";
import gridAreas from "@savvywombat/tailwindcss-grid-areas";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./{app,layers}/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens,
    extend: {},
  },
  plugins: [daisyui, debugScreens, gridAreas],
  daisyui: {
    themes: ["corporate", "dark"],
  },
};
