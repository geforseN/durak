import defaultTheme from "tailwindcss/defaultTheme";

/** @type {NonNullable<import('tailwindcss').Config['theme']>['screens']} */
export default {
  xxs: "310px",
  xs: "475px",
  sm: defaultTheme.screens.sm,
  md: defaultTheme.screens.md,
  lg: defaultTheme.screens.lg,
  xl: defaultTheme.screens.xl,
  "2xl": defaultTheme.screens["2xl"],
};
