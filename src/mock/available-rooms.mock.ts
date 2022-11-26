import type { Room } from "@/types/available-rooms.types";

export const random_pic_url = "https://picsum.photos/75/";

export const mockRoomsData: Room[] = [
  {
    game_type: "basic",
    max_players: 4,
    players: [
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "1",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "2",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "3",
      },
      {
        img_href: random_pic_url,
        name: "Vitally",
        profile_id: "4",
      },
    ],
  },
  {
    max_players: 2,
    game_type: "perevodnoy",
    players: [
      {
        img_href: random_pic_url,
        name: "Rock",
        profile_id: "5",
      },
    ],
  },
  {
    max_players: 6,
    game_type: "basic",
    players: [
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "6",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "7",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "8",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "9",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "10",
      },
      {
        img_href: random_pic_url,
        name: "Deb",
        profile_id: "11",
      },
    ],
  },
];
