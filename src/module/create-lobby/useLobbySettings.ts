import { computed, reactive, watch } from "vue";
import type {
  MaxUserCount,
  CardCount,
  GameType,
  LobbySettings as GameSettings,
} from "@/module/game-lobbies/types";

const defaultSettings: GameSettings = {
  maxUserCount: 2,
  cardCount: 36,
  gameType: "basic",
};

export const allowedMaxUserCount: MaxUserCount[] = [2, 3, 4, 5, 6];
export const allowedCardCount: CardCount[] = [24, 36, 52];
export const allowedGameTypes: GameType[] = ["basic", "perevodnoy"];

export default function useLobbySettings() {
  const lobbySettings = reactive<GameSettings>(defaultSettings);

  const resetSettings = () => {
    lobbySettings.maxUserCount = defaultSettings.maxUserCount;
    lobbySettings.cardCount = defaultSettings.cardCount;
    lobbySettings.gameType = defaultSettings.gameType;
  };

  const canMakeFirstDistribution = (cardCount: number) => {
    return cardCount >= lobbySettings.maxUserCount * 6;
  };

  watch(lobbySettings, (newLobbySettings, oldLobbySettings) => {
    if (canMakeFirstDistribution(oldLobbySettings.cardCount)) return;
    const currentCardIndex = allowedCardCount.findIndex(
      (count) => count === oldLobbySettings.cardCount,
    );
    newLobbySettings.cardCount = allowedCardCount[currentCardIndex + 1];
  });

  const properCardCountValues = computed(() => {
    return allowedCardCount.filter(canMakeFirstDistribution);
  });

  return {
    resetSettings,
    canMakeFirstDistribution,
    lobbySettings,
    properCardCountValues,
  };
}
