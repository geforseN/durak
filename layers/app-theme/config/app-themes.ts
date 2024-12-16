export const appThemes = {
  system: "System",
  corporate: "Light",
  dark: "Dark",
} as const;

export function isAppTheme(theme: unknown): theme is keyof typeof appThemes {
  return typeof theme === "string" && theme in appThemes
}