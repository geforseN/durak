import { useAsyncState } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { getMe } from "@/api/rest";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const user = ref<null>({});

  const user2 = useAsyncState(
    async () => {
      const result = await getMe();
      console.log(result);
      if (Object.values(result).length === 0) {
        throw new Error("No user was found");
      }
      user.value = result;
      return result;
    },
    null,
    { shallow: false, immediate: true },
  );

  const goToGame = async ({ gameId }: { gameId: string }) => {
    const path = `/game/${gameId}`;
    try {
      await router.replace({ path });
      // user.currentLobbyId = null;
      // user.currentGameId = gameId;
      console.log(`Successfully navigate to ${path}`);
    } catch (error) {
      console.error("Failed to navigate to game", { path, error });
    }
  };

  return {
    user,
    user2,
    goToGame,
  };
});
