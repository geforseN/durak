import type { Ref } from "vue";
import useEnemyCardCount from "./useEnemyCardCount";
import type { PlayerData } from "@/stores/game/self.store";
import usePlayer from "./usePlayer";

export default function useEnemy(
  playerData: Ref<PlayerData>,
  cardCount: Ref<number>,
) {
  const enemyCardCount = useEnemyCardCount(cardCount);
  const player = usePlayer(playerData);
  
  return { ...player, ...enemyCardCount };
}
