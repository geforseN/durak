import type { Ref } from "vue";
import useEnemyCardCount from "./useEnemyCardCount";
import type { PlayerData } from "@/stores/game/self.store";
import usePlayer from "./usePlayer";

export default function useEnemy(
  playerData: Ref<NonNullable<PlayerData>>,
  cardCount: Ref<number>,
) {
  const player = usePlayer(playerData);
  const enemyCardCount = useEnemyCardCount(cardCount);

  return {
    ...playerData.value,
    ...player,
    ...enemyCardCount,
  };
}
