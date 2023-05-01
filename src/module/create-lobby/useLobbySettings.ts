import { computed, reactive, watch } from "vue";
import type {
  MaxUserCount,
  CardCount,
  GameType,
  LobbySettings,
} from "@/module/game-lobbies/types";

const defaultSettings: LobbySettings = {
  maxUserCount: 2,
  cardCount: 36,
  gameType: "basic",
};

export const allowedMaxUserCount: MaxUserCount[] = [2, 3, 4, 5, 6];
export const allowedCardCount: CardCount[] = [24, 36, 52];
export const allowedGameTypes: GameType[] = ["basic", "perevodnoy"];

const mostGreatestCardCountIndex = allowedCardCount.length - 1;

export default function useLobbySettings() {
  const lobbySettings: LobbySettings = reactive({...defaultSettings});

  const resetSettings = () => {
    lobbySettings.maxUserCount = defaultSettings.maxUserCount;
    lobbySettings.cardCount = defaultSettings.cardCount;
    lobbySettings.gameType = defaultSettings.gameType;
  };

  const isProperCardCount = (cardCount = lobbySettings.cardCount) => {
    return cardCount >= lobbySettings.maxUserCount * 6;
  };

  watch(() => lobbySettings.maxUserCount, () => {
    if (isProperCardCount()) return;
    changeCurrentCardCount();
  });

  const changeCurrentCardCount = () => {
    const currentCardCountIndex = allowedCardCount.indexOf(lobbySettings.cardCount);
    const newCardCountIndex = currentCardCountIndex === mostGreatestCardCountIndex
      ? currentCardCountIndex
      : currentCardCountIndex + 1;
    lobbySettings.cardCount = allowedCardCount[newCardCountIndex];
  };

  const properCardCountValues = computed(() => {
    return allowedCardCount.filter(isProperCardCount);
  });

  return {
    resetSettings,
    isProperCardCount,
    lobbySettings,
    properCardCountValues,
  };
}
