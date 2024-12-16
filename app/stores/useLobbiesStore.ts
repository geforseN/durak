import { defineStore } from "pinia";

import { createLobby } from "$/game-lobbies/entity";
import type { LobbyDTO, LobbyUserDTO } from "$/game-lobbies/types";
import { useLobbies, useLobbiesWebSocket } from "$/game-lobbies/composable";

import { useUserStore, useNotificationStore } from "@/stores";

function isFailedToGetLobbiesNotificationAlert(
  notification: object | undefined,
) {
  return (
    notification &&
    "notificationAlert" in notification &&
    typeof notification.notificationAlert === "object" &&
    notification.notificationAlert !== null &&
    "message" in notification.notificationAlert &&
    typeof notification.notificationAlert.message === "string" &&
    notification.notificationAlert.message.startsWith(
      "Не удалось получить данный игровых лобби.",
    )
  );
}

export const useLobbiesStore = defineStore("lobbies", () => {
  const userStore = useUserStore();
  const notificationStore = useNotificationStore();

  const lobbies = useLobbies();

  const ws = useLobbiesWebSocket({
    "notification::push": (
      notification: Parameters<
        typeof notificationStore.addNotificationInQueue
      >[0],
    ) => {
      if (isFailedToGetLobbiesNotificationAlert(notification)) {
        return;
      }
      notificationStore.addNotificationInQueue(notification);
    },
    "lobbies::restore": restoreState,
    "lobby::add": addLobby,
    "lobby::user::join": addUserInLobby,
    "lobby::user::leave": removeUser,
    "lobby::admin::update": updateLobbyAdmin,
    "lobby::remove": deleteLobby,
    "lobby::upgrade": userStore.goToGame,
  });

  function restoreState({ state }: { state: LobbyDTO[] }) {
    lobbies.updateWith(state.map(createLobby));
  }

  function addLobby({ lobby }: { lobby: LobbyDTO }) {
    lobbies.addLobby(createLobby(lobby));
  }

  function deleteLobby({ lobbyId }: { lobbyId: LobbyDTO["id"] }) {
    lobbies.removeLobbyById(lobbyId);
  }

  function addUserInLobby({
    user,
    lobbyId,
    slotIndex,
  }: {
    user: LobbyUserDTO;
    lobbyId: LobbyDTO["id"];
    slotIndex: number;
  }) {
    const lobby = lobbies.getLobbyById(lobbyId);
    lobby.putUserByIndex(user, slotIndex);
  }

  function removeUser({
    lobbyId,
    userId,
  }: {
    lobbyId: LobbyDTO["id"];
    userId: LobbyUserDTO["id"];
  }) {
    const lobby = lobbies.getLobbyById(lobbyId);
    lobby.removeUserWithId(userId);
  }

  function updateLobbyAdmin({
    lobbyId,
    newAdminId,
  }: {
    lobbyId: LobbyDTO["id"];
    newAdminId: LobbyUserDTO["id"];
  }) {
    const lobby = lobbies.getLobbyById(lobbyId);
    lobby.tryUpdateAdminById(newAdminId);
  }

  return {
    state: lobbies.state,
    restoreState,
    addLobby,
    addUserInLobby,
    removeUser,
    updateLobbyAdmin,
    deleteLobby,
    lobbies,
    ws,
  };
});
