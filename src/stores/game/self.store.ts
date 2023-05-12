import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type {
  PlayerRole,
  Self,
  UserInfo,
  Card,
} from "@/module/card-game/types";

const defaultUserInfo: UserInfo = {
  accname: "",
  personalLink: "",
  photoUrl: "",
  nickname: "",
  connectStatus: "OFFLINE",
};

export const useGameSelfStore = defineStore("gameSelf", () => {
  const self = ref<Self>({ cards: [], info: defaultUserInfo, role: "Player", id: '' });

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

  const changeRole = (role: PlayerRole, accname: string) => {
    if (accname !== self.value.info.accname) {
      throw new Error("Self has not found");
    }
    self.value.role = role;
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

  const selfId = computed(() => self.value.info.accname);

  return { has, remove, pushCard, removeCard, changeRole, self, selfId };
});
