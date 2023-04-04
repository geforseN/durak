import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import type { UIStatus } from "@/module/card-game/types";

export const useGameUIStore = defineStore("gameUI", () => {
  const gameUI = reactive<{
    attackerStatus: UIStatus,
    defenderStatus: UIStatus,
  }>({
    attackerStatus: "hidden",
    defenderStatus: "hidden",
  });

  const setAttackUI = (status: UIStatus) => {
    gameUI.attackerStatus = status;
  };

  const setDefendUI = (status: UIStatus) => {
    gameUI.defenderStatus = status;
  };

  const defendStatus = computed(() => gameUI.defenderStatus);
  const attackStatus = computed(() => gameUI.attackerStatus);

  return { setDefendUI, setAttackUI, defendStatus, attackStatus };
});