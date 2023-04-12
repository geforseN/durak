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

export default function useLobbySettings() {
  const lobbySettings = reactive<LobbySettings>(defaultSettings);

  const resetSettings = () => {
    lobbySettings.maxUserCount = defaultSettings.maxUserCount;
    lobbySettings.cardCount = defaultSettings.cardCount;
    lobbySettings.gameType = defaultSettings.gameType;
  };

  const isProperCardCount = (cardCount: number) => {
    return cardCount >= lobbySettings.maxUserCount * 6;
  };

  watch(lobbySettings, (newLobbySettings, oldLobbySettings) => {
    if (isProperCardCount(oldLobbySettings.cardCount)) {
      return;
    }
    const currentCardIndex = allowedCardCount.findIndex(
      (count) => count === oldLobbySettings.cardCount,
    );
    // FIXME
    // IF currentCardIndex === allowedCardCount.length
    // THEN allowedCardCount[currentCardIndex + 1] can make error
    newLobbySettings.cardCount = allowedCardCount[currentCardIndex + 1];
  });

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
