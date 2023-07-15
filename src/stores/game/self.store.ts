import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type {
  PlayerRole,
  Self,
  UserInfo,
  Card,
} from "@/module/card-game/types";
import { useGameStateStore } from "@/stores/game/game.store";

const defaultUserInfo: UserInfo = {
  id: "",
  personalLink: "",
  photoUrl: "",
  nickname: "",
  connectStatus: "OFFLINE",
  isAdmin: false,
};

export const useGameSelfStore = defineStore("gameSelf", () => {
  const self = ref<Self>({
    cards: [],
    info: defaultUserInfo,
    kind: "Player",
    id: "",
  });
  const gameStateStore = useGameStateStore();

  const pushCard = (cards: Card[]) => {
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

  const changeRole = (kind: PlayerRole, playerId: string) => {
    if (playerId !== self.value.id) {
      throw new Error("Self has not found");
    }
    self.value.kind = kind;
  };

  function cardMatcher(this: Card, card: Card) {
    return card.suit === this.suit && card.rank === this.rank;
  }

  const has = ({ card }: { card: Card }) => {
    return self.value.cards.some(cardMatcher, card);
  };

  const remove = ({ card }: { card: Card }) => {
    const index = self.value.cards.findIndex(cardMatcher, card);
    if (index === -1) throw new Error("Do not have such card");
    return self.value.cards.splice(index, 1);
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
    remove,
    pushCard,
    removeCard,
    changeRole,
    self,
    selfId,
    isAttacker,
    isDefender,
    canMakeMove,
    canMakeDefenseMove,
    canMakeAttackMove,
  };
});
