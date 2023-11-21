import { computed, reactive, watch } from "vue";

const defaultSettings: LobbySettings = {
  userCount: 2,
  cardCount: 36,
  gameType: "basic",
  moveTime: 30_000,
};

export const allowedUserCount: UserCount[] = [2, 3, 4, 5, 6];
export const allowedCardCount: CardCount[] = [24, 36, 52];
export const allowedGameTypes: GameType[] = ["basic", "perevodnoy"];
const mostGreatestCardCountIndex = allowedCardCount.length - 1;

export default function useLobbySettings() {
  const lobbySettings: LobbySettings = reactive({ ...defaultSettings });

  const resetSettings = () => {
    lobbySettings.userCount = defaultSettings.userCount;
    lobbySettings.cardCount = defaultSettings.cardCount;
    lobbySettings.gameType = defaultSettings.gameType;
    lobbySettings.moveTime = defaultSettings.moveTime;
  };

  const isProperCardCount = (cardCount = lobbySettings.cardCount) => {
    return cardCount >= lobbySettings.userCount * 6;
  };

  watch(
    () => lobbySettings.userCount,
    () => {
      if (isProperCardCount()) return;
      changeCurrentCardCount();
    },
  );

  const changeCurrentCardCount = () => {
    const currentCardCountIndex = allowedCardCount.indexOf(
      lobbySettings.cardCount,
    );
    const newCardCountIndex =
      currentCardCountIndex === mostGreatestCardCountIndex
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
