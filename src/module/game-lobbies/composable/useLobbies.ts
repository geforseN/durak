import { ref } from "vue";

import type { ILobby } from "../entity";

export const useLobbies = () => {
  const state = ref<ILobby[]>([]);

  function findLobbyById(lobbyId: ILobby["id"]) {
    return state.value.find((lobby) => lobby.id === lobbyId);
  }

  function getLobbyIndexById(lobbyId: ILobby["id"]) {
    const index = state.value.findIndex((lobby) => lobby.id === lobbyId);
    if (index < 0) {
      throw new Error("Lobby not found");
    }
    return index;
  }

  return {
    state,
    updateWith(newState: ILobby[]) {
      state.value = newState;
    },
    addLobby(lobby: ILobby) {
      state.value.push(lobby);
    },
    findLobbyById,
    getLobbyIndexById,
    getLobbyById(lobbyId: ILobby["id"]) {
      const lobbyIndex = getLobbyIndexById(lobbyId);
      return state.value[lobbyIndex];
    },
    removeLobbyById(lobbyId: ILobby["id"]) {
      const lobbyIndex = getLobbyIndexById(lobbyId);
      state.value.splice(lobbyIndex, 1);
    },
  };
};
