import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { type Lobby, createLobby } from "@/module/game-lobbies/entity/index";
import type { LobbyUser } from "@/module/global-chat/types";
import { useUserStore } from "@/stores/user.store";

export const useLobbiesStore = defineStore("lobbies", () => {
  const userStore = useUserStore();
  const lobbies = useLobbies();

  const restoreState = async ({ state }: { state: Lobby[] }) => {
    lobbies.updateWith(state.map(createLobby));
    userStore.user.tryUpdateCurrentLobby(lobbies.state);
  };

  const addLobby = ({ lobby }: { lobby: Lobby }) => {
    lobbies.addLobby(createLobby(lobby));
  };

  const deleteLobby = ({ lobbyId }: { lobbyId: Lobby["id"] }) => {
    lobbies.removeLobbyById(lobbyId);
  };

  const addUserInLobby = ({
    user,
    lobbyId,
    slotIndex,
  }: {
    user: LobbyUser;
    lobbyId: Lobby["id"];
    slotIndex: number;
  }) => {
    const lobby = lobbies.getLobbyById(lobbyId);
    lobby.putUserByIndex(user, slotIndex);
    userStore.user2.tryUpdateCurrentLobbyData(lobby);
    userStore.user2.tryUpdateLobbyAdminData(lobby);
  };

  const removeUser = ({
    lobbyId,
    userId,
  }: {
    lobbyId: Lobby["id"];
    userId: LobbyUser["id"];
  }) => {
    const lobby = lobbies.getLobbyById(lobbyId);
    lobby.removeUserWithId(userId);
    userStore.user2.tryLeaveLobby(lobby);
  };

  const updateLobbyAdmin = ({
    lobbyId,
    newAdminId,
  }: {
    lobbyId: Lobby["id"];
    newAdminId: LobbyUser["id"];
  }) => {
    const lobby = lobbies.getLobbyById(lobbyId);
    lobby.tryUpdateAdminById(newAdminId);
  };

  watch(
    () => userStore.user2.state.id,
    (userId) => {
      // const lobby = lobbies.findLobbyWithUserByUserId(userId);
      // if (!lobby) {
      //   return;
      // }
      userStore.user2.tryUpdateCurrentLobby(lobbies);
    },
  );

  return {
    restoreState,
    addLobby,
    addUserInLobby,
    removeUser,
    updateLobbyAdmin,
    deleteLobby,
    lobbies,
  };
});

const useLobbies = () => {
  const lobbies = ref<LobbyImpl[]>([]);

  function findLobbyById(lobbyId: string) {
    return lobbies.value.find((lobby) => lobby.id === lobbyId);
  }

  function getLobbyIndexById(lobbyId: string) {
    const index = lobbies.value.findIndex((lobby) => lobby.id === lobbyId);
    if (index < 0) {
      throw new Error("Lobby not found");
    }
    return index;
  }

  return {
    state: lobbies,
    updateWith(state: LobbyImpl[]) {
      lobbies.value = state;
    },
    addLobby(lobby: LobbyImpl) {
      lobbies.value.push(lobby);
    },
    findLobbyById,
    getLobbyIndexById,
    getLobbyById(lobbyId: string) {
      const lobbyIndex = getLobbyIndexById(lobbyId);
      return lobbies.value[lobbyIndex];
    },
    removeLobbyById(lobbyId: string) {
      const lobbyIndex = getLobbyIndexById(lobbyId);
      lobbies.value.splice(lobbyIndex, 1);
    },
  };
};
