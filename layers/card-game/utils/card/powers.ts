import cardPowerDictionary from "@/utils/dictionary/card-power.dictionary";
import type { Card } from "@durak-game/durak-dts";

export const powers = cardPowerDictionary;

export function powerOfCard(card: Card) {
  return cardPowerDictionary[card.rank];
}