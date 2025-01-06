import type { Card } from "@durak-game/durak-dts";
import { ref, watch } from "vue";

export function useNoCardCountTalon(
  {
    hasOneCard = false,
    isEmpty = false,
    trumpCard,
  }: {
    isEmpty?: boolean;
    hasOneCard?: boolean;
    trumpCard: Card;
  },
) {
  const state = ref({
    isEmpty,
    hasOneCard,
    trumpCard,
  });

  watch(
    () => [hasOneCard, isEmpty],
    ([hasOneCard, isEmpty]) => {
      if (hasOneCard && isEmpty) {
        throw new Error(
          "Talon can not be empty and have one card at the same time",
        );
      }
    },
  );

  return {
    state,
    updateFlags(newCardCount: number) {
      if (newCardCount !== 1 && newCardCount !== 0) {
        throw new Error(
          "Talon can not receive `newCardCount` that is not 0 or 1",
        );
      }
      state.value.hasOneCard = newCardCount === 1;
      state.value.isEmpty = newCardCount === 0;
    },
  };
}
