import defaultTheme from "tailwindcss/defaultTheme";
import daisyui from "daisyui";
import debugScreens from "tailwindcss-debug-screens";
import gridAreas from "@savvywombat/tailwindcss-grid-areas";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./{app,layers}/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: "310px",
      xs: "475px",
      sm: defaultTheme.screens.sm,
      md: defaultTheme.screens.md,
      lg: defaultTheme.screens.lg,
      xl: defaultTheme.screens.xl,
      "2xl": defaultTheme.screens["2xl"],
    },
    extend: {},
  },
  plugins: [daisyui, debugScreens, gridAreas],
  daisyui: {
    themes: ["corporate", "dark"],
  },
};
