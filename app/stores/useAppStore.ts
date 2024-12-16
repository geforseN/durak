import { defineStore } from "pinia";
import { useAppScreen } from "@/composable/useAppScreen";
import { useAppDrawer } from "$/app-drawer/composables/useAppDrawer";
import {
  useAppTheme,
  appThemes,
  isAppTheme,
  AppThemeLocaleStorageRepository,
} from "$/app-theme-select";

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
