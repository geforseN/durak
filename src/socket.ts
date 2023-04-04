import { io, Socket } from "socket.io-client";

const BASE_SOCKET_URI = import.meta.env.VITE_SOCKET_SERVER_ADDRESS;

export const socket = io(BASE_SOCKET_URI + "/", {
  withCredentials: true,
});

export const globalChat = io(BASE_SOCKET_URI + "/global-chat", {
  withCredentials: true,
});

export const gameLobbies = io(BASE_SOCKET_URI + "/lobbies", {
  withCredentials: true,
});

export function getGameSocketSingleton(gameId?: string): Socket {
  let gameSocket: Socket | null = null;

  if (gameId && !gameSocket) {
    gameSocket = io(
      `${BASE_SOCKET_URI}/game/${gameId}`,
      { withCredentials: true },
    );
  }
  return gameSocket as Socket;
}
