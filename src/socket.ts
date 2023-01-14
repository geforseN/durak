import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_SERVER_ADDRESS + "/", {
  withCredentials: true,
});

export const globalChat = io(import.meta.env.VITE_SOCKET_SERVER_ADDRESS + "/global-chat", {
  withCredentials: true,
});

export default socket;
