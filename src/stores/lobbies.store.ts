import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { Lobby } from "@/module/game-lobbies/types";
import { useUserStore } from "@/stores/user.store";
import type { User } from "@/module/global-chat/types";

export const useLobbiesStore = defineStore("lobbies", () => {
  const lobbies = ref<Lobby[]>([]);
  const lobbiesReactive = reactive<Lobby[]>([]);
  const lobbiesSet = reactive(new Set<Lobby>());
  // TODO add userCurrentLobbyId ref<string | null>(null);
  // UPD added in userStore

  const userStore = useUserStore();

  const restoreLobbies = ({ lobbies: lobbiesPayload, lobbyId }: { lobbies: Lobby[], lobbyId: string }) => {
    lobbies.value = lobbiesPayload;
    lobbiesReactive.splice(0, lobbiesReactive.length, ...lobbiesPayload);
    lobbiesSet.clear();
    lobbiesPayload.forEach((lobby => lobbiesSet.add(lobby)));
    // TODO can set currentLobbyId in store
  };

  const addLobby = ({ lobby }: { lobby: Lobby }) => {
    lobbies.value.push(lobby);
    lobbiesReactive.push(lobby);
    lobbiesSet.add(lobby);
  };

  const deleteLobby = ({ lobbyId }: { lobbyId: string }) => {
    lobbies.value.splice(findLobbyIndex(lobbyId), 1);
    lobbiesReactive.splice(findLobbyIndex(lobbyId), 1 /* FIXME dont use findLobbyIndex */);
    const lobby = [...lobbiesSet.values()].find((lobby) => lobby.id === lobbyId);
    if (!lobby) throw new Error("Bad delete lobby from set");
    lobbiesSet.delete(lobby);
    console.log(lobbiesSet.size);
    for (const lobby of lobbiesSet) {
      if (lobby.id === lobbyId) {
        console.log("successfully remove lobby");
        lobbiesSet.delete(lobby);
      }
    }
    console.log(lobbiesSet.size);
  };

  const findLobbyIndex = (lobbyId: Lobby["id"]) => {
    const lobbyIndex = lobbies.value.findIndex((lobby) => lobby.id === lobbyId);
    if (lobbyIndex !== -1) return lobbyIndex;
    throw new Error(`Lobby ${lobbyId} was not found`);
  };

  const removeFromLobby = (user: User) => {
    const oldLobbyIndex = findLobbyIndexWithUser(user.id);
    if (oldLobbyIndex === -1) return;
    const oldLobby = lobbies.value[oldLobbyIndex];
    removeUser({ userId: user.id, lobbyId: oldLobby.id });
    // NOTE: it is important to firstly remove user from old lobby
    // and only then delete empty lobby
    // otherwise users in lobby may render incorrect
    if (oldLobby.users.length === 0) {
      lobbies.value.splice(oldLobbyIndex, 1);
    }
  };

  const addUserInLobby = ({ user, lobbyId, slotIndex }: { user: User, lobbyId: string, slotIndex: number }) => {
    const lobbyIndex = findLobbyIndex(lobbyId);
    removeFromLobby(user);
    lobbies.value[lobbyIndex].users[slotIndex] = user;
    lobbiesReactive[lobbyIndex].users[slotIndex] = user;
  };

  const findLobbyIndexWithUser = (userId: string) => {
    return lobbies.value.findIndex((lobby) => lobby.users.some((user) => user?.id === userId));
  };

  const removeUser = ({ lobbyId, userId }: { userId: User["id"], lobbyId: Lobby["id"] }) => {
    const lobbyIndex = findLobbyIndex(lobbyId);
    const userIndex = lobbies.value[lobbyIndex].users.findIndex((user) => user?.id === userId);
    const indexOfLobby = lobbiesReactive.findIndex((lobby) => lobby.id === lobbyId);
    const lobby = lobbiesReactive.find((lobby) => lobby.id === lobbyId);
    console.assert(lobby === lobbiesReactive[indexOfLobby]);
    lobbies.value[lobbyIndex].users[userIndex] = undefined;
    lobbiesReactive[indexOfLobby].users[userIndex] = undefined;
  };

  const updateLobbyAdmin = ({ lobbyId, adminId }: { lobbyId: Lobby["id"], adminId: User["id"] }) => {
    const lobbyIndex = findLobbyIndex(lobbyId);
    for (const user of lobbies.value[lobbyIndex].users) {
      if (!user) continue;
      user.isAdmin = adminId === user.id;
    }
    const indexOfLobby = lobbiesReactive.findIndex((lobby) => lobby.id === lobbyId);
    for (const user of lobbiesReactive[indexOfLobby].users) {
      if (!user) continue;
      user.isAdmin = adminId === user.id;
    }
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