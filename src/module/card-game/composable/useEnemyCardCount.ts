import { type Ref } from "vue";

export default function useEnemyCardCount(cardCount: Ref<number>) {
  return {
    cardCount,
    decrementCardCount() {
      cardCount.value--;
    },
    increaseCardCount(cardCountToAdd: number) {
      cardCount.value += cardCountToAdd;
    },
  };
}
