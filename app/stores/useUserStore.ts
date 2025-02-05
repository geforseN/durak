import { useAsyncState } from "@vueuse/core";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import { getMe } from "@/api/rest";
import { computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();

  const user = useAsyncState(
    () => {
      return getMe();
    },
    null,
    {
      shallow: false,
      immediate: true,
    },
  );

  const goToGame = async ({ gameId }: { gameId: string }) => {
    const path = `/games/${gameId}`;
    try {
      await router.replace({ path });
      // TODO remove code here, add methods for lobby|game state
      // user.currentLobbyId = null;
      // user.currentGameId = gameId;
      console.log(`Successfully navigate to ${path}`);
    } catch (error) {
      console.error("Failed to navigate to game", { path, error });
    }
  };

  const isUserAuthenticated = computed(
    () => !user.error.value && !!user.state.value,
  );

  return {
    user,
    goToGame,
    isUserAuthenticated,
  };
});
