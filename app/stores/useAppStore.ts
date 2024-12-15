import { useAppScreen } from "@/composable/useAppScreen";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const screen = useAppScreen();

  return {
    screen,
  };
});
