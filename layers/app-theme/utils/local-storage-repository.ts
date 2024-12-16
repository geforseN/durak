import type { AppThemeRepository } from "./repository.interface";

export class AppThemeLocalStorageRepository<T extends string>
  implements AppThemeRepository<T>
{
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
