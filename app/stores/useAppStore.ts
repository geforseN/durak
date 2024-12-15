import { defineStore } from "pinia";
import { useAppScreen } from "@/composable/useAppScreen";
import { useAppDrawer } from "$/app-drawer/composables/useAppDrawer";

export const useAppStore = defineStore("app", () => {
  const screen = useAppScreen();

  const drawer = useAppDrawer();

  return {
    screen,
    drawer,
  };
});
