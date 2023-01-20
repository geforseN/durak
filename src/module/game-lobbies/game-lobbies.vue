<template>
  <div>
    <div
      class="flex flex-col gap-y-1 p-1 m-3 border-2 border-orange-500 bg-purple-100"
      v-for="lobby of lobbies"
    >
      <div class="flex justify-between">
        <span class="flex items-center px-2 bg-purple-400 rounded-xl">{{
          gameTypesNames[lobby.settings.gameType]
        }}</span>
        <button
          class="bg-blue-600 focus:bg-blue-500 border-2 border-black px-2 py-[1px]"
          @click="joinLobby(lobby.id)"
        >
          Присоединиться
        </button>
      </div>
      <div class="flex h-36">
        <template v-for="userIndex of lobby.settings.maxUsers">
          <!-- TODO: img size issue -->
          <div
            v-if="lobby.users[userIndex - 1]"
            class="grid grid-rows-[1fr_fit-content] flex-1 border border-4 p-2 border-black bg-purple-200"
          >
            <img
              :src="lobby.users[userIndex - 1].photoUrl"
              :alt="`${lobby.users[userIndex - 1].nickname} profile picture`"
              class="aspect-square max-w-[80%]"
            />
            <router-link
              class="underline"
              :to="`/profile/${lobby.users[userIndex - 1].urlToProfile}`"
              target="_blank"
            >
              {{ lobby.users[userIndex - 1].nickname }}
            </router-link>
          </div>
          <button
            v-else
            class="bg-purple-300 flex-1 border border-4 border-black"
          >
            {{ userIndex }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useNotificationStore from "@/stores/notification.store";
import { gameLobbies } from "@/socket";
import type { User } from "@/module/global-chat/types";
import { mockGameLobbies } from "@/module/game-lobbies/lobbies.mock";
import generateNotificationFromError from "@/utils/generate-notification-from-error";
import gameTypesNames from "../../utils/game-types-names";
import type { Lobby } from "@/module/game-lobbies/types/lobby.type";

const notificationStore = useNotificationStore();

const lobbies = ref<Lobby[]>([]);

const joinLobby = (lobbyId: string, cellIndex: number = -1) => {
  gameLobbies.emit("joinLobby", lobbyId, cellIndex);
};

function lobbyMatcher(this: { lobbyId: string }, lobby: Lobby) {
  return lobby.id === this.lobbyId;
}

function userMatcher(this: { accName: string }, user: User) {
  return user.accName === this.accName;
}

gameLobbies.on("restoreLobbies", (lobbiesToRestore: Lobby[]) => {
  lobbies.value.concat(lobbiesToRestore)
})

gameLobbies.on("lobbyCreated", (lobby: Lobby) => {
  console.log("lobby", lobby.id);
  lobbies.value.push(lobby);
});

gameLobbies.on("addedUser", (user: User, lobbyId: string) => {
  try {
    const lobbyIndex = lobbies.value.findIndex((lobby) => lobby.id === lobbyId);
    if (lobbyIndex === -1) throw new Error("Не найдена комната");
    console.log(lobbyIndex);
    lobbies.value[lobbyIndex].users.push(user);
  } catch (error) {
    if (error instanceof Error) {
      const notification = generateNotificationFromError(error);
      notificationStore.addNotificationInQueue(notification);
    } else {
      console.log(error);
    }
  }
});

gameLobbies.on("deleteLobby", (lobbyId: string) => {
  const lobbyIndexToRemove = lobbies.value.findIndex(lobbyMatcher, { lobbyId });
  lobbies.value.splice(lobbyIndexToRemove, 1);
});

gameLobbies.on("removePlayer", (accName: string, lobbyId: string) => {
  const lobbyIndex = lobbies.value.findIndex(lobbyMatcher, { lobbyId });
  const userIndexToRemove = lobbies.value[lobbyIndex].users.findIndex(
    userMatcher,
    { accName },
  );
  lobbies.value[lobbyIndex].users.splice(userIndexToRemove, 1);
});



</script>

<style scoped></style>
