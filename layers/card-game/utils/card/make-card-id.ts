import suitsDictionary from "@/utils/dictionary/suits.dictionary";
import type { Rank } from "@durak-game/durak-dts";
import type { _Suit } from "@durak-game/durak-dts";

export function makeCardId(rank: Rank, suit: _Suit) {
  const rankChar = rank === "10" ? "0" : rank;
  return `${rankChar}${suitsDictionary[suit]}`;
}
