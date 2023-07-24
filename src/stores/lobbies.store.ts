import type { Lobby } from "@/module/game-lobbies/types";
import type { User } from "@/module/global-chat/types";
import { useUserStore } from "@/stores/user.store";
import { defineStore } from "pinia";
import { reactive, watch } from "vue";

export const useLobbiesStore = defineStore("lobbies", () => {
  const userStore = useUserStore();
  // TODO update type of Lobby['users']
  const lobbies = reactive<Lobby[]>([]);

  const restoreState = (lobbiesState: Lobby[]) => {
    lobbies.splice(0, lobbies.length, ...lobbiesState);
    const lobbyWithMe = lobbies.find((lobby) =>
      lobby.users.some((user) => user?.id === userStore.user.id),
    );
    if (!lobbyWithMe) return;
    userStore.user.currentLobbyId = lobbyWithMe.id;
    //  //  lobby.slots.some((slot) => slot.user?.id === userStore.user.id)
  };

  const addLobby = ({ lobby }: { lobby: Lobby }) => {
    lobbies.push(lobby);
  };

  const deleteLobby = ({ lobbyId }: { lobbyId: Lobby["id"] }) => {
    const lobbyIndex = lobbies.findIndex((lobby) => lobby.id === lobbyId);
    if (lobbyIndex < 0) throw 1;
    lobbies.splice(lobbyIndex, 1);
  };

  const addUserInLobby = ({
    user,
    lobbyId,
    slotIndex,
  }: {
    user: User;
    lobbyId: Lobby["id"];
    slotIndex: number;
  }) => {
    const lobby = lobbies.find((lobby) => lobby.id === lobbyId);
    if (!lobby) throw 2;
    // ? idc, will line below work, will lobby.users be updated ?
    lobby.users[slotIndex] = user;
    if (user.id !== userStore.user.id) return;
    userStore.user.currentLobbyId = lobby.id;
  };

  const removeUser = ({
    lobbyId,
    userId,
  }: {
    lobbyId: Lobby["id"];
    userId: User["id"];
  }) => {
    const lobby = lobbies.find((lobby) => lobby.id === lobbyId);
    if (!lobby) throw 3;
    const userIndex = lobby.users.findIndex((user) => user?.id === userId);
    if (userIndex < 0) throw 4;
    lobby.users[userIndex] = undefined;
    if (userId !== userStore.user.id) return;
    userStore.user.currentLobbyId = null;
  };

  const updateLobbyAdmin = ({
    lobbyId,
    adminId,
  }: {
    lobbyId: Lobby["id"];
    adminId: User["id"];
  }) => {
    const lobby = lobbies.find((lobby) => lobby.id === lobbyId);
    if (!lobby) throw 5;
    for (const user of lobby.users) {
      if (!user) continue;
      user.isAdmin = adminId === user.id;
    }
  };

  watch(
    () => userStore.user.id,
    (userId) => {
      userStore.user.currentLobbyId = lobbies.find((lobby) => {
        return lobby.users.some((user) => user?.id === userId);
      })?.id;
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
