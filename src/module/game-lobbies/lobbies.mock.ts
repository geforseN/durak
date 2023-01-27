import type { Lobby } from "@/module/game-lobbies/types";

export const mockGameLobbies: Lobby[] = [
  {
    users: [
      {
        accname: "admin",
        personalLink: "__unknown__user__",
        photoUrl: "https://randomuser.me/api/portraits/lego/6.jpg",
        nickname: "GeForseN-",
        connectStatus: 2,
      },
      {
        accname: "second",
        personalLink: "second2",
        nickname: "SeConDNiCk",
        photoUrl: "https://randomuser.me/api/portraits/men/25.jpg",
        connectStatus: 2,
      },
      {
        accname: "third",
        photoUrl: "https://randomuser.me/api/portraits/women/88.jpg",
        nickname: "kovvka",
        personalLink: "kittyG",
        connectStatus: 2,
      },
    ],
    id: "asdas",
    settings: {
      gameType: "basic",
      maxUserCount: 4,
      cardCount: 36
    },
    adminAccname: "admin",
  }, {
    users: [
      {
        accname: "admin",
        personalLink: "__unknown__user__",
        photoUrl: "https://randomuser.me/api/portraits/lego/6.jpg",
        nickname: "GeForseN-",
        connectStatus: 2,
      },
      {
        accname: "second",
        personalLink: "second2",
        nickname: "SeConDNiCk",
        photoUrl: "https://randomuser.me/api/portraits/men/25.jpg",
        connectStatus: 2,
      },
      {
        accname: "third",
        photoUrl: "https://randomuser.me/api/portraits/women/88.jpg",
        nickname: "kovvka",
        personalLink: "kittyG",
        connectStatus: 2,
      },
      {
        accname: "third",
        photoUrl: "https://randomuser.me/api/portraits/women/88.jpg",
        nickname: "kovvka",
        personalLink: "kittyG",
        connectStatus: 2,
      },
    ],
    id: "asdas",
    settings: {
      gameType: "basic",
      maxUserCount: 6,
      cardCount: 52
    },
    adminAccname: "admin",
  },
];