import { defineStore } from "pinia";
import { useAppScreen } from "@/composable/useAppScreen";
import { useAppDrawer } from "$/app-drawer/composables/useAppDrawer";
import {
  useAppTheme,
  appThemes,
  isAppTheme,
  AppThemeLocalStorageRepository,
} from "$/app-theme";

export const useAppStore = defineStore("app", () => {
  const screen = useAppScreen();

  const drawer = useAppDrawer();

  const theme = useAppTheme(
    appThemes,
    new AppThemeLocalStorageRepository("durak-app:theme", isAppTheme, "system"),
  );

  return {
    screen,
    drawer,
    theme,
  };
});
