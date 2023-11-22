import { computed, ref, watch } from "vue";
import {
  allowedTalonCardCount,
  allowedDurakGameTypes,
  allowedPlayerCount,
  defaultInitialGameSettings,
  type TalonCardCount,
  type InitialGameSettings,
} from "@durak-game/durak-dts";

const indexOfMostGreatestTalonCardCount = allowedTalonCardCount.length - 1;

if (typeof indexOfMostGreatestTalonCardCount === "undefined") {
  throw new Error("mostGreatestCardCountIndex is not a number");
}

export default function useLobbySettings() {
  const lobbySettings = ref<InitialGameSettings>({
    ...defaultInitialGameSettings,
  });

  function resetToDefault() {
    lobbySettings.value = { ...defaultInitialGameSettings };
  }

  function isProperTalonCardCount(cardCount: TalonCardCount) {
    return cardCount >= lobbySettings.value.talonCardCount * 6;
  }

  const isCurrentTalonCardCountValid = computed(() => {
    return isProperTalonCardCount(lobbySettings.value.talonCardCount);
  });

  watch(
    () => lobbySettings.value.talonCardCount,
    () => {
      if (isCurrentTalonCardCountValid.value) {
        return;
      }
      changeCurrentCardCount();
    },
  );

  function changeCurrentCardCount() {
    const indexOfCurrentTalonCardCount = allowedTalonCardCount.indexOf(
      lobbySettings.value.talonCardCount,
    );
    const indexOfNewTalonCardCount =
      indexOfCurrentTalonCardCount === indexOfMostGreatestTalonCardCount
        ? indexOfCurrentTalonCardCount
        : indexOfCurrentTalonCardCount + 1;
    lobbySettings.value.talonCardCount =
      allowedTalonCardCount[indexOfNewTalonCardCount];
  }

  return {
    state: lobbySettings,
    resetToDefault,
    allowedValues: {
      talonCardCount: computed(() => {
        return allowedTalonCardCount.filter(isProperTalonCardCount);
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
