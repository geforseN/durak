import { defineStore } from "pinia";
import { useAppScreen } from "@/composable/useAppScreen";
import { useAppDrawer } from "$/app-drawer/composables/useAppDrawer";
import { useAppTheme } from "$/app-theme-select/app-theme-select";


export const useAppStore = defineStore("app", () => {
  const screen = useAppScreen();

  const drawer = useAppDrawer();

  const theme = useAppTheme();

  return {
    screen,
    drawer,
    theme,
  };
});
