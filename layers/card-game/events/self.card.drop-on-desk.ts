import { ranks, suits } from "@durak-game/durak-dts";
import * as v from "valibot";

const schema = v.object({
  card: v.object({
    rank: v.picklist(ranks),
    suit: v.picklist(suits),
  }),
  slotIndex: v.pipe(v.number(), v.integer(), v.minValue(0)),
});

export const makeDropOnDeskEvent = (detail: unknown) =>
  v.parse(schema, detail) &&
  new CustomEvent("drop-on-desk", {
    bubbles: true,
    detail,
  });
