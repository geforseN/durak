import type { PlayerData } from "@/stores/game/self.store";
import type { PlayerKind } from "@durak-game/durak-dts";
import { computedEager } from "@vueuse/core";
import type { Ref } from "vue";

export default function usePlayer(player: Ref<PlayerData>) {
  const canMakeMove = computedEager(() => {
    return player.value?.kind.includes("Allowed");
  });

  const isAttacker = computedEager(() => {
    return player.value?.kind.includes("Attacker");
  });

  const isDefender = computedEager(() => {
    return player.value?.kind.includes("Defender");
  });

  const isSurrendered = computedEager(() => {
    return player.value?.kind.includes("SurrenderedDefender");
  });

  const canMakeDefenseMove = computedEager(
    () => canMakeMove.value && isDefender.value,
  );

  const canMakeAttackMove = computedEager(
    () => canMakeMove.value && isAttacker.value,
  );

  function updateKind(newKind: PlayerKind) {
    if (!player.value) {
      throw new Error(
        "Can not update kind of self: playerData yet was not restored",
      );
    }
    player.value.kind = newKind;
  }

  return {
    isAttacker,
    isDefender,
    isAllowed: canMakeMove,
    isSurrendered,
    canMakeMove,
    canMakeDefenseMove,
    canMakeAttackMove,
    updateKind
  };
}
