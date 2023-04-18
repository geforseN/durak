import { defineStore } from "pinia";
import { ref } from "vue";
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
  const self = ref<Self>({ cards: [], info: defaultUserInfo, role: "Player" });

  const pushCard = (...cards: Card[]) => {
    self.value.cards.push(...cards);
  };

  const removeCard = ({ suit, rank }: Card) => {
    const cardIndex = self.value.cards.findIndex(
      (card) => card.suit === suit && card.rank === rank,
    );
    if (!cardIndex) throw new Error("Can not remove card from Self");
    self.value.cards.splice(cardIndex, 1);
  };

  const changeRole = (role: PlayerRole, accname: string) => {
    if (accname !== self.value.info.accname) {
      throw new Error("Self has not found");
    }
    self.value.role = role;
  };

  return { pushCard, removeCard, changeRole, self };
});
