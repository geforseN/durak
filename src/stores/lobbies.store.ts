import { defineStore } from "pinia";
import { ref } from "vue";
import type { Lobby } from "@/module/game-lobbies/types";

export const useLobbiesStore = defineStore("lobbies", () => {
  const lobbies = ref<Lobby[]>([]);

  const restoreLobbies = (lobbiesToRestore: Lobby[]) => {
    lobbies.value = lobbiesToRestore;
  };

  const addLobby = (lobby: Lobby) => {
    lobbies.value.push(lobby);
  };

  const deleteLobby = (lobbyId: string) => {
    const lobbyIndex = findLobbyIndex(lobbyId);
    lobbies.value.splice(lobbyIndex, 1);
  };

  const findLobbyIndex = (lobbyId: Lobby["id"]) => {
    const lobbyIndex = lobbies.value.findIndex((lobby) => lobby.id === lobbyId);
    if (lobbyIndex !== -1) return lobbyIndex;
    throw new Error(`Lobby ${lobbyId} was not found`);
  };

  const removeFromLobby = (user: any) => {
    const oldLobbyIndex = findLobbyIndexWithUser(user.accname);
    if (oldLobbyIndex === -1) return;
    const oldLobby = lobbies.value[oldLobbyIndex];
    removeUser(user.accname, oldLobby.id);
    // NOTE: it is important to firstly remove user from old lobby
    // and only then delete empty lobby
    // otherwise users in lobby may render incorrect
    if (!oldLobby.users.length) {
      lobbies.value.splice(oldLobbyIndex, 1);
    }
  };
  const addUserInLobby = (user: any, lobbyId: string) => {
    const lobbyIndex = findLobbyIndex(lobbyId);
    removeFromLobby(user);
    lobbies.value[lobbyIndex].users.push(user);
  };

  const findLobbyIndexWithUser = (accname: string) => {
    return lobbies.value.findIndex((lobby) => lobby.users.some((user) => user.accname === accname));
  };

  const findUserIndexInLobby = (lobbyIndex: number, accname: string) => {
    return lobbies.value[lobbyIndex].users.findIndex((user) => user.accname === accname);
  };

  const removeUser = (accname: string, lobbyId: string) => {
    const lobbyIndex = findLobbyIndex(lobbyId);
    const userIndex = findUserIndexInLobby(lobbyIndex, accname);
    lobbies.value[lobbyIndex].users.splice(userIndex, 1);
  };

  const updateLobbyAdmin = (newAdminAccname: string, lobbyId: string) => {
    const lobbyIndex = findLobbyIndex(lobbyId);
    lobbies.value[lobbyIndex].adminAccname = newAdminAccname;
  };

  return {
    restoreLobbies,
    addLobby,
    addUserInLobby,
    removeUser,
    updateLobbyAdmin,
    deleteLobby,
    lobbies,
  };
});