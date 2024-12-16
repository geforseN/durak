import { onMounted, ref, watch } from "vue";

class AppThemeLocaleStorageRepository<T extends string> {
  constructor(
    readonly key: string,
    readonly isAllowedValue: (theme: unknown) => theme is T,
    readonly defaultValue: T,
  ) {}

  getOrDefault(): T {
    const themeFromStorage = localStorage.getItem(this.key);
    if (themeFromStorage && this.isAllowedValue(themeFromStorage)) {
      return themeFromStorage;
    }
    return this.defaultValue;
  }

  setOrThrow(theme: unknown) {
    if (this.isAllowedValue(theme)) {
      localStorage.setItem(this.key, theme);
    } else {
      throw new Error(`Theme ${theme} is not allowed`);
    }
  }
}

const appThemes = {
  system: "System",
  corporate: "Light",
  dark: "Dark",
} as const;

export function useAppTheme() {
  const defaultValue = "system" satisfies keyof typeof appThemes;
  const themeRepository = new AppThemeLocaleStorageRepository(
    "app:theme",
    (value): value is keyof typeof appThemes =>
      typeof value === "string" && value in appThemes,
    defaultValue,
  );

  const selectedTheme = ref(defaultValue);

  onMounted(() => {
    selectedTheme.value = themeRepository.getOrDefault();
  });

  watch(selectedTheme, (theme) => {
    themeRepository.setOrThrow(theme);
    document.documentElement.dataset.theme = theme;
  });

  return {
    record: appThemes,
    selected: selectedTheme,
  };
}