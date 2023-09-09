import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Self, UserInfo, Card } from "@/module/card-game/types";
import { useGameStateStore } from "@/stores/game/game.state.store";

const defaultUserInfo: UserInfo = {
  id: "",
  isAdmin: false,
  profile: {
    personalLink: "",
    photoUrl: "",
    nickname: "",
    connectStatus: "OFFLINE",
    userId: "",
  },
};

export const useGameSelfStore = defineStore("gameSelf", () => {
  const self = ref<Self>({
    cards: [],
    isAllowedToMove: false,
    info: defaultUserInfo,
    kind: "Player",
    id: "",
  });
  const gameStateStore = useGameStateStore();

  const pushCards = (cards: Card[]) => {
    self.value.cards.push(...cards);
  };

  const removeCard = ({ suit, rank }: Card) => {
    const cardIndex = self.value.cards.findIndex(
      (card) => card.suit === suit && card.rank === rank,
    );
    if (cardIndex === -1) {
      throw new Error("Can not remove card from Self");
    }
    self.value.cards.splice(cardIndex, 1);
  };

  function isSameCard(this: Card, card: Card) {
    return card.suit === this.suit && card.rank === this.rank;
  }

  const has = ({ card }: { card: Card }) => {
    return self.value.cards.some(isSameCard, card);
  };

  const selfId = computed(() => self.value.id);
  const isDefender = computed(() => self.value.kind === "Defender");
  const isAttacker = computed(() => self.value.kind === "Attacker");
  const canMakeMove = computed(
    () => gameStateStore.allowedPlayerId === selfId.value,
  );
  const canMakeDefenseMove = computed(
    () => canMakeMove.value && isDefender.value,
  );
  const canMakeAttackMove = computed(
    () => canMakeMove.value && isAttacker.value,
  );

  return {
    has,
    pushCards,
    removeCard,
    self,
    selfId,
    isAttacker,
    isDefender,
    canMakeMove,
    canMakeDefenseMove,
    canMakeAttackMove,
  };
});
