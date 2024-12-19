import type * as consts from "./const";

import type {
  ConnectStatusType as ConnectStatus,
  DurakGame,
  User,
  UserGamePlayer,
  UserProfile,
  UserGameStat,
} from "../server/prisma/schema/generated/zod";

export type {
  ConnectStatus,
  DurakGame,
  User,
  UserGamePlayer,
  UserProfile,
  UserGameStat,
};

export type InitialGameSettings = {
  playerCount: PlayerCount;
  talonCardCount: TalonCardCount;
  gameType: DurakGameType;
  moveTime: number;
};

export type AllowedPlayerKind = (typeof consts.allowedPlayerKinds)[number];

export type PlayerKind = (typeof consts.playerKinds)[number];

export type Rank = (typeof consts.ranks)[number];

export type Suit = (typeof consts.suits)[number];

export type Power = (typeof consts.powers)[keyof typeof consts.powers];

export type NotificationAlert = {
  message: string;
  type: "Error" | "Warning" | "Success";
  durationInMS: number;
  id: string;
};

export type PlayerInfo = {
  id: string;
  isAdmin: boolean;
  profile: {
    userId: string;
    nickname: string;
    photoUrl: string;
    personalLink: string;
    connectStatus: "ONLINE" | "AWAY" | "OFFLINE";
  };
};

export type BasePlayer =
  | {
      info: PlayerInfo;
      kind: PlayerKind;
      id: string;
      isAllowedToMove: boolean;
    }
  | {
      info: PlayerInfo;
      kind: AllowedPlayerKind;
      id: string;
      isAllowedToMove: boolean;
      whenMayBecomeDisallowed: { UTC: number };
    };

export type Card = {
  rank: Rank;
  suit: Suit;
};
export type CardDTO = Card;

export type DurakGameType = (typeof consts.allowedDurakGameTypes)[number];


export type TalonCardCount = (typeof consts.allowedTalonCardCount)[number];

export type PlayerCount = (typeof consts.allowedPlayerCount)[number];

export type AllowedMissingCardCount = (typeof consts.allowedMissingCardCount)[number];

export type DeskSlot = {
  attackCard?: Card;
  defendCard?: Card;
};
export type EmptyDeskSlot = {
  attackCard: undefined;
  defendCard: undefined;
};
export type AttackedDeskSlot = {
  attackCard: Card;
  defendCard: undefined;
};
export type DefendedDeskSlot = {
  attackCard: Card;
  defendCard: Card;
};

export type GameSettings = {
  players: {
    count: PlayerCount;
    moveTime: number;
  };
  type: DurakGameType;
  talon: {
    count: TalonCardCount;
    trumpCard?: Card;
  };
  initialDistribution: {
    finalCardCount: AllowedMissingCardCount;
    cardCountPerIteration: AllowedMissingCardCount;
  };
  desk: {
    allowedFilledSlotCount: AllowedMissingCardCount;
    slotCount: AllowedMissingCardCount;
  };
};

export type Self = BasePlayer & { cards: Card[] };

export type Enemy = BasePlayer & { cardCount: number };

export type GameState = {
  self: BasePlayer & { cards: Card[] };
  enemies: Enemy[];
  discard: {
    isEmpty: boolean;
  };
  round: {
    number: number;
  };
  status: "starts" | "started" | "ended";
  desk: {
    slots: DeskSlot[];
  };
  settings: GameSettings;
  talon: {
    trumpCard: Card;
    isEmpty: boolean;
    hasOneCard: boolean;
  };
};
