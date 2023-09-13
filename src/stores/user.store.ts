import { dispatchMessage } from "@/api/websocket";
import { type User } from "@/module/global-chat/types";
import { useNotificationStore } from "@/stores/notification.store";
import { useWebSocket } from "@vueuse/core";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const WAIT_TIME_FOR_WS_USER_DATA_TO_LOAD = 3_000;

export const useUserStore = defineStore("user", () => {
  const notificationStore = useNotificationStore();
  const router = useRouter();
  const user = reactive<
    Partial<
      User & {
        currentLobbyId: string | null;
        currentGameId: string | null;
        isCreatingLobby: boolean;
      }
    >
  >({ isCreatingLobby: false });

  useWebSocket(
    `${import.meta.env.VITE_FASTIFY_SERVER_URI.replace(/^http/, "ws")}`,
    {
      onConnected(websocket) {
        websocket.addEventListener("open", function (event) {
          console.log("ws '/': open", event);
        });
        websocket.addEventListener("close", function (event) {
          console.log("ws '/': close", event);
        });
        websocket.addEventListener(
          "message",
          dispatchMessage.bind(websocket, handlers, (error) => {
            console.log(error);
          }),
        );
        websocket.addEventListener("error", function (event) {
          console.log("ws '/': error: ", event);
          notificationStore.addNotificationInQueue({
            message: "Не удалось установить соединение.",
            type: "Error",
          });
        });
      },
    },
  );

  const handlers = {
    "user::restore": (payload: { user: object }) => {
      console.log({ name: "user::restore", user, payload });
      user.id = payload.user.id;
      user.profile = payload.user.profile;
      user.isAnonymous = payload.user.isAnonymous;
      isUserDataLoaded.value = true;
      console.log({ name: "user::restore", user, payload });
    },
    "durakGames::restore": ({
      startedGames,
    }: {
      startedGames: {
        players: { id: string }[];
        id: string;
      }[];
    }) => {
      if (!user.id) return;
      const currentGameId =
        startedGames.find((game) =>
          game.players.some((player) => player.id === user.id),
        )?.id || null;
      console.log({ currentGameId });
      user.currentGameId = currentGameId;
    },
  };
  const { VITE_FASTIFY_SERVER_URI: host } = import.meta.env;

  async function getMe() {
    if (isUserDataLoaded.value) {
      return user;
    }
    return await fetch(
      new Request(`${host}/me`, {
        method: "GET",
        mode: "cors",
      }),
    )
      .then((response) => {
        console.log({ name: "getMe", response });
        return response.json();
      })
      .then((payload) => {
        if (isUserDataLoaded.value) {
          console.log({
            name: "getMe",
            message: "user data is loaded by ws",
          });
          return user;
        }
        if (!payload.user) {
          return void setTimeout(() => {
            if (isUserDataLoaded.value) {
              console.log({
                name: "getMe",
                message:
                  "user data is loaded by ws, no payload from http was received",
              });
              return user;
            }
            throw new Error("getMe handler did not send user data");
          }, WAIT_TIME_FOR_WS_USER_DATA_TO_LOAD);
        }
        console.log({ name: "getMe", user, payload });
        user.id = payload.user.id;
        user.profile = payload.user.profile;
        user.isAnonymous = payload.user.isAnonymous;
        isUserDataLoaded.value = true;
        console.log({ name: "getMe", user, payload });
        return user;
      });
  }

  const isUserDataLoaded = ref(false);

  const goToGame = ({ gameId }: { gameId: string }) => {
    const path = `/game/${gameId}`;
    router
      .replace({ path })
      .then(() => {
        user.currentLobbyId = null;
        user.currentGameId = gameId;
        console.log(`Successfully navigate to ${path}`);
      })
      .catch(console.error);
  };

  // NOTE: REALLY bad NAME
  function leaveLobby() {
    user.currentLobbyId = null;
    user.isAdmin = false;
    user.isLobbyAdmin = false;
  }

  // NOTE: REALLY bad NAME
  function joinLobbyAsAdmin() {
    user.isAdmin = true;
    user.isLobbyAdmin = true;
  }

  return {
    user,
    joinLobbyAsAdmin,
    leaveLobby,
    goToGame,
    isUserDataLoaded,
    getMe,
  };
});
