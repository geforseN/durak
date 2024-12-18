import type * as SocketIO from "../server/src/types/socket-io";

import type {
  PlayerKind,
  BasePlayer as Player,
  Card,
  GameState,
  NotificationAlert,
  User,
  UserProfile,
  DurakGame,
  UserGamePlayer,
} from "./types";

export type ClientToServerEvents = {
  player__exitGame: () => void;
  superPlayer__stopMove: () => void;
  superPlayer__putCardOnDesk: (card: Card, slotIndex: number) => void;
};

export type ServerToClientEvents = {
  "nonStartedGame::details": (payload: {
    joinedPlayersIds: Player["id"][];
  }) => void;
  "nonStartedGame::playerJoined": (payload: {
    player: { id: Player["id"] };
  }) => void;
  "finishedGame::restore": (payload: {
    state: DurakGame & { players: UserGamePlayer[] };
  }) => void;
  "finishedGame::notFound": () => void;
  "notification::push": (notification: NotificationAlert) => void;
  "game::state::restore": (payload: { state: GameState }) => void;
  // TODO add more payload data to 'game::over' event
  "game::over": (payload: { durak: { id: Player["id"] } }) => void;
} & DeskServerToClientEvents &
  DiscardServerToClientEvents &
  MoveServerToClientEvents &
  PlayerServerToClientEvents &
  RoundServerToClientEvents &
  TalonServerToClientEvents;

type DeskServerToClientEvents = {
  "desk::becameClear": () => void;
  "desk::receivedCard": (payload: {
    card: Card;
    slot: { index: number };
    performer: { id: Player["id"] };
  }) => void;
};

type DiscardServerToClientEvents = {
  "discard::receivedCards": (payload: {
    addedCardsCount: number;
    isReceivedFirstCards: boolean;
    // NOTE: it is not best idea to emit count of discard cards
    // discard cards count can be used for cheating
    // user always can inject JavaScript code
    totalCardsCount?: number;
  }) => void;
};

type MoveServerToClientEvents = {
  "move::new": (payload: {
    move: {
      performer?: { id: string };
      name: string;
      insert?: {
        card: Card;
        slot: { index: number };
      };
    };
  }) => void;
};

type PlayerServerToClientEvents = {
  "player::receiveCards": (payload: {
    player:
      | {
          id: Player["id"];
          addedCardsCount: number;
          handCount?: number;
        }
      | {
          addedCards: Card[];
          handCount?: number;
        };
  }) => void;
  "player::removeCard": (
    payload:
      | {
          player: {
            id: Player["id"];
            newCardsCount?: number;
          };
        }
      | {
          player?: { newCardsCount: number };
          card: Card;
        },
  ) => void;
  "player::changedKind": (payload: {
    player:
      | {
          id: Player["id"];
          newKind: PlayerKind;
        }
      | {
          newKind: PlayerKind;
        };
  }) => void;
  "player::leftGame": (
    payload: { player: { id: Player["id"] } } | void,
  ) => void;
  "allowedPlayer::defaultBehavior": (
    payload:
      | {
          defaultBehavior: {
            callTime: {
              UTC: number;
            };
          };
        }
      | {
          allowedPlayer: { id: Player["id"] };
          defaultBehavior: {
            callTime: {
              UTC: number;
            };
          };
        },
  ) => void;
};

type RoundServerToClientEvents = {
  "round::new": (payload: { round: { number: number } }) => void;
};

type TalonServerToClientEvents = {
  "talon::madeDistribution": (payload: {
    receiver: {
      id: Player["id"];
    };
    distributionCards: {
      count: number;
      isMainTrumpCardIncluded: boolean;
    };
    talon: {
      // NOTE: it is not best idea to emit card count of talon
      // talon card count can be used for cheating
      // user always can inject JavaScript code
      cardCount?: number;
      isOnlyTrumpCardRemained: boolean;
    };
  }) => void;
};

export type InterServerEvents = Record<string, never>;

export type SocketData = {
  sid: string;
  user: User & { profile: UserProfile };
};

export type Socket = SocketIO.Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type Namespace = SocketIO.Namespace<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
