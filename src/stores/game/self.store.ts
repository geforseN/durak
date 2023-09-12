import { defineStore } from "pinia";
import { computed, ref } from "vue";
import Self from "@/module/card-game/entity/Self";
import type { BasePlayer, Card as CardDTO } from "@durak-game/durak-dts";

export const useGameSelfStore = defineStore("gameSelf", () => {
  const self = ref(new Self());

  const restore = (selfDTO: BasePlayer & { cards: CardDTO[] }) => {
    self.value = new Self(selfDTO);
  };

  const selfId = computed(() => self.value.id);
  const isDefender = computed(() => self.value.kind === "Defender");
  const isAttacker = computed(() => self.value.kind === "Attacker");
  const canMakeMove = computed(() => self.value.canMakeMove);
  const canMakeDefenseMove = computed(
    () => canMakeMove.value && isDefender.value,
  );
  const canMakeAttackMove = computed(
    () => canMakeMove.value && isAttacker.value,
  );

  return {
    self,
    selfId,
    isAttacker,
    isDefender,
    canMakeMove,
    canMakeDefenseMove,
    canMakeAttackMove,
    restore
  };
});
