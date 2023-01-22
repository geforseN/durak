import { io } from "socket.io-client";

const BASE_SOCKET_URI = import.meta.env.VITE_SOCKET_SERVER_ADDRESS;

export const socket = io(BASE_SOCKET_URI + "/", {
  withCredentials: true,
});

export const globalChat = io(BASE_SOCKET_URI + "/global-chat", {
  withCredentials: true,
});

export const gameLobbies = io(BASE_SOCKET_URI + "/game-lobbies", {
  withCredentials: true,
});
