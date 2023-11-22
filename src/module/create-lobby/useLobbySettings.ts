import { computed, reactive, watch } from "vue";
import {
  allowedTalonCardCount,
  allowedDurakGameTypes,
  allowedPlayerCount,
  defaultInitialGameSettings,
  type TalonCardCount,
} from "@durak-game/durak-dts";

const indexOfMostGreatestTalonCardCount = allowedTalonCardCount.length - 1;

if (typeof indexOfMostGreatestTalonCardCount === "undefined") {
  throw new Error("mostGreatestCardCountIndex is not a number");
}

export default function useLobbySettings() {
  const lobbySettings = reactive({
    ...defaultInitialGameSettings,
  });

  function resetToDefault() {
    for (const key in defaultInitialGameSettings) {
      // @ts-expect-error key has string type, but it is keyof typeof defaultInitialGameSettings
      lobbySettings[key] = defaultInitialGameSettings[key];
    }
  }

  function isProperCardCount(cardCount: TalonCardCount) {
    return cardCount >= lobbySettings.playerCount * 6;
  }

  const isCurrentTalonCardCountValid = computed(() => {
    return isProperCardCount(lobbySettings.talonCardCount);
  });

  watch(
    () => lobbySettings.playerCount,
    () => {
      if (isCurrentTalonCardCountValid.value) {
        return;
      }
      changeCurrentCardCount();
    },
  );

  function changeCurrentCardCount() {
    const indexOfCurrentTalonCardCount = allowedTalonCardCount.indexOf(
      lobbySettings.talonCardCount,
    );
    const indexOfNewTalonCardCount =
      indexOfCurrentTalonCardCount === indexOfMostGreatestTalonCardCount
        ? indexOfCurrentTalonCardCount
        : indexOfCurrentTalonCardCount + 1;
    lobbySettings.talonCardCount =
      allowedTalonCardCount[indexOfNewTalonCardCount];
  }

  return {
    state: lobbySettings,
    resetToDefault,
    allowedValues: {
      talonCardCount: computed(() => {
        return allowedTalonCardCount.filter(isProperCardCount);
      }),
      durakGameTypes: allowedDurakGameTypes,
      playerCount: allowedPlayerCount,
    },
    assertValidLobbySettings() {
      if (!isCurrentTalonCardCountValid.value) {
        throw new Error("Invalid lobby settings");
      }
    },
  };
}
