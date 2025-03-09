import type { CardDTO } from "@durak-game/durak-dts";
import { ref } from "vue";

export function useSelfDraggedCard(hooks: {
  onDropOnDesk: (card: CardDTO, slotIndex: number) => void;
}) {
  const draggedCard = ref<CardDTO | null>(null);

  function onDrag(card: CardDTO) {
    draggedCard.value = card;
  }

  function onDragEnd() {
    draggedCard.value = null;
  }

  function onDeskDrop(slotIndex: number) {
    const card = draggedCard.value;
    if (!card) {
      throw new Error("Can not drop card on desk: no card was dragged");
    }
    hooks.onDropOnDesk(card, slotIndex);
  }

  return {
    onDeskDrop,
    onDrag,
    onDragEnd,
  };
}
