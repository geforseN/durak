<template>
  <main
    class="flex min-h-[90vh] flex-col items-center justify-evenly gap-y-2 bg-base-100"
  >
    <with-enemies-by-sides v-bind="enemiesBySides">
      <with-board-layout>
        <template #discard="_props">
          <game-discard
            v-bind="discard"
            :class="_props.class"
          />
        </template>
        <template #talon="_props">
          <game-talon
            v-bind="talon"
            :class="_props.class"
          />
        </template>
        <template #slots="_props">
          <with-game-desk-slots
            :values="slots"
            :class="_props.class"
            #="deskSlot"
          >
            <with-game-desk-slot-drag-and-drop
              #="_props"
              class="relative rounded-lg bg-neutral text-neutral-content"
              @card-drop="
                (event, card) => onCardDrop(event, card, deskSlot.index)
              "
            >
              <game-desk-slot
                :class="_props.class"
                v-bind="deskSlot"
              />
            </with-game-desk-slot-drag-and-drop>
          </with-game-desk-slots>
        </template>
      </with-board-layout>
    </with-enemies-by-sides>
    <with-self-interface>
      <template #top>
        <with-self-allowed-message-hint v-if="allowed && isSelfAllowed">
          <self-stop-allowed-action-button
            :action="allowed.action"
            @click="
              () => {
                /* TODO: stop move */
              }
            "
          />
        </with-self-allowed-message-hint>
      </template>
      <template #deck>
        <with-self-deck-backdrop
          :trump-suit="talon.trumpCard.suit"  
          :cards="self.cards"
          #="card"
        >
          <self-card
            v-bind="card"
          />
        </with-self-deck-backdrop>
      </template>
    </with-self-interface>
  </main>
</template>
<script setup lang="ts">
import type { Card, Enemy, DeskSlot } from "@durak-game/durak-dts";
import WithEnemiesBySides from "$/card-game/layers/enemy/with-enemies-by-sides.vue";
import WithBoardLayout from "$/card-game/components/game/with-board-layout.vue";
import GameDiscard from "$/card-game/components/game/GameDiscard.vue";
import WithGameDeskSlots from "$/card-game/layers/desk/with-game-desk-slots.vue";
import WithSelfInterface from "$/card-game/layers/self/with-self-interface.vue";
import WithSelfDeckBackdrop from "$/card-game/layers/self/with-self-deck-backdrop.vue";
import WithSelfAllowedMessageHint from "$/card-game/layers/self/as-allowed/with-self-allowed-message-hint.vue";
import WithGameDeskSlotDragAndDrop from "$/card-game/layers/desk/with-game-desk-slot-drag-and-drop.vue";
import SelfStopAllowedActionButton from "$/card-game/layers/self/as-allowed/self-stop-allowed-action-button.vue";
import GameDeskSlot from "$/card-game/layers/desk/GameDeskSlot.vue";
import SelfCard from "../layers/self/card/SelfCard.vue";
import GameTalon from "$/card-game/components/game/GameTalon.vue";

defineProps<{
  enemiesBySides: {
    [k in "top" | "left" | "right"]: Enemy[];
  };
  discard: {
    isEmpty: boolean;
  };
  talon: {
    isEmpty: boolean;
    hasOneCard: boolean;
    trumpCard: Card;
  };
  slots: DeskSlot[];
  self: {
    cards: Card[];
  };
  isSelfAllowed: boolean;
  allowed?: {
    playerId: string;
    action: "attack" | "defend" | "smash";
  };
  onCardDrop: (event: DragEvent, card: Card, slotIndex: number) => void;
}>();
</script>
