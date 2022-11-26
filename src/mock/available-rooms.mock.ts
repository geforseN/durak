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
        profile_id: "1234",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "1234",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "1234",
      },
      {
        img_href: random_pic_url,
        name: "Vitally",
        profile_id: "2223",
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
        profile_id: "222223",
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
        profile_id: "1234",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "1234",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "1234",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "1234",
      },
      {
        img_href: random_pic_url,
        name: "Jora",
        profile_id: "1234",
      },
      {
        img_href: random_pic_url,
        name: "Deb",
        profile_id: "222223",
      },
    ],
  },
];
