import type { CardDTO } from "@durak-game/durak-dts";
import useSelfHand from "./useSelfHand";
import type { Ref } from "vue";
import usePlayer from "./usePlayer";
import type { PlayerData } from "@/stores/game/self.store";

export default function useSelf(
  playerData: Ref<PlayerData>,
  cards: Ref<CardDTO[]>,
) {
  const player = usePlayer(playerData);
  const hand = useSelfHand(cards);

  return { ...player, ...hand };
}
