import type { Lobby } from "@/module/game-lobbies/types";
import type { LobbyUser } from "@/module/global-chat/types";
import { useUserStore } from "@/stores/user.store";
import { defineStore } from "pinia";
import { reactive, watch } from "vue";

export const useLobbiesStore = defineStore("lobbies", () => {
  const userStore = useUserStore();
  const lobbies = reactive<Lobby[]>([]);

  const restoreState = ({ state }: { state: Lobby[] }) => {
    lobbies.splice(0, lobbies.length, ...state);
    console.log(
      `%c${userStore.user.id}`,
      "color: yellow; font-style: italic; background-color: blue;padding: 2px",
    );
    const lobbyWithMe = lobbies.find((lobby) =>
      lobby.slots.some((slot) => slot?.id === userStore.user.id),
    );
    if (!lobbyWithMe) return;
    userStore.user.currentLobbyId = lobbyWithMe.id;
    console.log({ currentLobbyId: userStore.user.currentLobbyId });
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
    user: LobbyUser;
    lobbyId: Lobby["id"];
    slotIndex: number;
  }) => {
    const lobby = lobbies.find((lobby) => lobby.id === lobbyId);
    if (!lobby) throw 2;
    lobby.slots[slotIndex] = user;
    if (user.id !== userStore.user.id) return;
    userStore.user.currentLobbyId = lobby.id;
    const lobbyAdmin = lobby.slots.find((slot) => slot?.isAdmin);
    if (user.id !== lobbyAdmin?.id) return;
    userStore.joinLobbyAsAdmin();
  };

  const moveUser = ({ lobbyId, newSlotIndex, pastSlotIndex }) => {
    const lobby = lobbies.find((lobby) => lobby.id === lobbyId);
    if (!lobby) return;
    [lobby.slots[pastSlotIndex], lobby.slots[newSlotIndex]] = [
      lobby.slots[newSlotIndex],
      lobby.slots[pastSlotIndex],
    ];
  };

  const removeUser = ({
    lobbyId,
    userId,
  }: {
    lobbyId: Lobby["id"];
    userId: LobbyUser["id"];
  }) => {
    const lobby = lobbies.find((lobby) => lobby.id === lobbyId);
    if (!lobby) throw 3;
    const userIndex = lobby.slots.findIndex((user) => user?.id === userId);
    if (userIndex < 0) throw 4;
    lobby.slots[userIndex] = null;
    if (userId !== userStore.user.id) return;
    userStore.leaveLobby();
  };

  const updateLobbyAdmin = ({
    lobbyId,
    newAdminId,
  }: {
    lobbyId: Lobby["id"];
    newAdminId: LobbyUser["id"];
  }) => {
    const lobby = lobbies.find((lobby) => lobby.id === lobbyId);
    if (!lobby) throw new Error("Server send wrong data");
    const pastAdmin = lobby.slots.find((slot) => slot?.isAdmin);
    if (pastAdmin) pastAdmin.isAdmin = false;
    const newAdmin = lobby.slots.find((slot) => slot?.id === newAdminId);
    if (!newAdmin) throw new Error("Server send wrong data");
    newAdmin.isAdmin = true;
  };

  watch(
    () => userStore.user.id,
    (userId) => {
      userStore.user.currentLobbyId = lobbies.find((lobby) => {
        return lobby.slots.some((user) => user?.id === userId);
      })?.id;
    },
  );

  return {
    moveUser,
    restoreState,
    addLobby,
    addUserInLobby,
    removeUser,
    updateLobbyAdmin,
    deleteLobby,
    lobbies,
  };
});
