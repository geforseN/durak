import type { Lobby } from "@/module/game-lobbies/types/lobby.type";

export const mockGameLobbies: Lobby[] = [
{
  users: [
    {
      accName: "admin",
      urlToProfile: "__unknown__user__",
      photoUrl: "https://randomuser.me/api/portraits/lego/6.jpg",
      nickname: "GeForseN-",
      connectStatus: 2,
    },
    {
      accName: "second",
      urlToProfile: "second2",
      nickname: "SeConDNiCk",
      photoUrl: "https://randomuser.me/api/portraits/men/25.jpg",
      connectStatus: 2,
    },
    {
      accName: "third",
      photoUrl: "https://randomuser.me/api/portraits/women/88.jpg",
      nickname: "kovvka",
      urlToProfile: "kittyG",
      connectStatus: 2,
    },
  ],
  id: "asdas",
  settings: {
    gameType: "basic",
    maxUsers: 4,
  },
}, {
  users: [
    {
      accName: "admin",
      urlToProfile: "__unknown__user__",
      photoUrl: "https://randomuser.me/api/portraits/lego/6.jpg",
      nickname: "GeForseN-",
      connectStatus: 2,
    },
    {
      accName: "second",
      urlToProfile: "second2",
      nickname: "SeConDNiCk",
      photoUrl: "https://randomuser.me/api/portraits/men/25.jpg",
      connectStatus: 2,
    },
    {
      accName: "third",
      photoUrl: "https://randomuser.me/api/portraits/women/88.jpg",
      nickname: "kovvka",
      urlToProfile: "kittyG",
      connectStatus: 2,
    },
    {
      accName: "third",
      photoUrl: "https://randomuser.me/api/portraits/women/88.jpg",
      nickname: "kovvka",
      urlToProfile: "kittyG",
      connectStatus: 2,
    },
  ],
  id: "asdas",
  settings: {
    gameType: "basic",
    maxUsers: 6,
  },
}]