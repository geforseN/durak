export type Player = {
  img_href: string;
  name: string;
  profile_id: string | number;
};

export type Room = {
  game_type: "basic" | "perevodnoy";
  max_players: 2 | 3 | 4 | 5 | 6;
  players: Player[];
};
