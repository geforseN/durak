<template>
  <main
    class="flex min-h-[90vh] flex-col items-center justify-evenly gap-y-2 bg-base-100"
  >
    <with-enemies-by-sides
      :top="[
        {
          cardCount: 6,
          id: 'asd',
          isAllowedToMove: false,
          kind: 'Defender',
          info: {
            id: 'asd',
            isAdmin: false,
            profile: {
              connectStatus: 'ONLINE',
              nickname: 'Anon',
              personalLink: 'link-asd',
              photoUrl:
                'https://cdn.7tv.app/emote/01GB9W6V0000098BZVD7GKTW0F/4x.avif',
              userId: 'asd',
            },
          },
        },
      ]"
      :left="[]"
      :right="[]"
    >
      <with-board-layout>
        <template #discard="_props">
          <game-discard
            :is-empty="false"
            :class="_props.class"
          />
        </template>
        <template #talon="_props">
          <game-talon
            :is-empty="false"
            :has-one-card="false"
            :trump-card="{ rank: '10', suit: '♠' }"
            :class="_props.class"
          />
        </template>
        <template #desk="_props">
          <game-desk
            :slots
            :class="_props.class"
          />
        </template>
      </with-board-layout>
    </with-enemies-by-sides>
    <with-self-interface>
      <template #top>
        <self-allowed-interface v-show="self.isAllowed" />
      </template>
      <template #deck>
        <self-deck :cards="self.cards" />
      </template>
    </with-self-interface>
  </main>
</template>
<script setup lang="ts">
import * as v from "valibot";
import { ref } from "vue";
import WithEnemiesBySides from "$/card-game/layers/enemy/with-enemies-by-sides.vue";
import WithBoardLayout from "$/card-game/components/game/with-board-layout.vue";
import GameDiscard from "$/card-game/components/game/GameDiscard.vue";
import GameTalon from "$/card-game/components/game/GameTalon.vue";
import GameDesk from "$/card-game/layers/desk/GameDesk.vue";
import WithSelfInterface from "$/card-game/layers/self/with-self-interface.vue";
import type { Card } from "@durak-game/durak-dts";
import SelfDeck from "$/card-game/layers/self/SelfDeck.vue";
import SelfAllowedInterface from "$/card-game/layers/self/SelfAllowedInterface.vue";

const props = defineProps<{
  id: string;
}>();

const self = {
  isAllowed: true,
  cards: [
    { rank: "K", suit: "♥" },
    { rank: "7", suit: "♠" },
    { rank: "9", suit: "♦" },
    { rank: "J", suit: "♠" },
    { rank: "A", suit: "♠" },
    { rank: "K", suit: "♣" },
  ] satisfies Card[],
};

const slots = ref(Array.from({ length: 6 }, () => ({})));

const cardSchema = v.object({
  rank: v.string(), // You can refine this further based on your needs
  suit: v.string(), // Similarly, refine for valid suits
});

const eventDetailSchema = v.object({
  slotIndex: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(0),
    v.check((v) => v < slots.value.length),
  ),
  card: cardSchema,
});


document.addEventListener("drop-on-desk", (event) => {
  if (!(event instanceof CustomEvent)) {
    throw new Error("Event is not instance of CustomEvent");
  }
  try {
    const {
      card,
      slotIndex,
    } = v.parse(eventDetailSchema, event.detail);
    const slot = slots.value[slotIndex];
    if (!('attackCard' in slot)) {
      slot.attackCard = card;
    } else if (!('defendCard' in slot)) {
      slot.defendCard = card;
    }
  } catch (error) {
    console.error("Invalid event detail:", error);
  }
});
</script>
