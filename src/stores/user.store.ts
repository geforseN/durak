import { dispatchMessage } from "@/api/websocket";
import { type User } from "@/module/global-chat/types";
import { useNotificationStore } from "@/stores/notification.store";
import { useWebSocket } from "@vueuse/core";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

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
    "user::profile::restore": ({ user }: { user }) => {
      console.log(user, "pls");
      user.id = user.id;
      user.profile = user.profile;
      isUserDataLoaded.value = true;
      console.log(user.profile);
    },
    "durakGames::restore": ({
      durakGames,
    }: {
      durakGames: {
        players: { id: string }[];
        id: string;
      }[];
    }) => {
      if (!user.id) return;
      user.currentGameId = durakGames.find((game) =>
        game.players.some((player) => player.id === user.id),
      )?.id;
    },
    "user::connectStatus::update": ({
      userId,
      connectStatus,
    }: {
      userId: (typeof user)["id"];
      connectStatus: (typeof user)["connectStatus"];
    }) => {
      console.log("TODO user::connectStatus::update", {
        userId,
        connectStatus,
      });
    },
  };
  const { VITE_FASTIFY_SERVER_URI: host } = import.meta.env;

  async function getMe() {
    if (user.profile?.nickname) return user;
    return await fetch(
      new Request(`${host}/me`, {
        method: "GET",
        mode: "cors",
      }),
    )
      .then((data) => data.json())
      .then(({ user: { id, profile, isAnonymous } }) => {
        user.id = id;
        user.profile = profile;
        user.isAnonymous = isAnonymous;
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
