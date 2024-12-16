import { defineStore } from "pinia";
import { useAppScreen } from "@/composable/useAppScreen";
import { useAppDrawer } from "$/app-drawer/composables/useAppDrawer";
import { useAppTheme } from "$/app-theme-select/useAppTheme";
import { appThemes, isAppTheme } from "$/app-theme-select/config/app-themes";
import { AppThemeLocaleStorageRepository } from "$/app-theme-select/utils/locale-storage-repository";

export const useAppStore = defineStore("app", () => {
  const screen = useAppScreen();

  const drawer = useAppDrawer();

  const theme = useAppTheme(
    appThemes,
    new AppThemeLocaleStorageRepository("theme", isAppTheme, "system"),
  );

  return {
    screen,
    drawer,
    theme,
  };
});
