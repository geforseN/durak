import { computed, type Ref } from "vue";

export default function useEnemyCardCount(_cardCount: Ref<number>) {
  return {
    cardCount: computed(() => _cardCount),
    decrementCardCount() {
      _cardCount.value--;
    },
    increaseCardCount(cardCountToAdd: number) {
      _cardCount.value += cardCountToAdd;
    },
  };
}
