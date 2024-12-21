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
            <game-desk-slot v-bind="deskSlot" />
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
        <self-deck :cards="self.cards" />
      </template>
    </with-self-interface>
  </main>
</template>
<script setup lang="ts">
import * as v from "valibot";
import { computed, provide, ref } from "vue";
import WithEnemiesBySides from "$/card-game/layers/enemy/with-enemies-by-sides.vue";
import WithBoardLayout from "$/card-game/components/game/with-board-layout.vue";
import GameDiscard from "$/card-game/components/game/GameDiscard.vue";
import GameTalon from "$/card-game/components/game/GameTalon.vue";
import WithGameDeskSlots from "$/card-game/layers/desk/with-game-desk-slots.vue";
import WithSelfInterface from "$/card-game/layers/self/with-self-interface.vue";
import type { Card } from "@durak-game/durak-dts";
import SelfDeck from "$/card-game/layers/self/SelfDeck.vue";
import WithSelfAllowedMessageHint from "$/card-game/layers/self/as-allowed/with-self-allowed-message-hint.vue";
import SelfStopAllowedActionButton from "$/card-game/layers/self/as-allowed/self-stop-allowed-action-button.vue";
import GameDeskSlot from "$/card-game/layers/desk/GameDeskSlot.vue";

const props = defineProps<{
  id: string;
}>();

const allowed = ref<
  | {
      playerId: string;
      action: "attack" | "defend" | "smash";
      // TODO: time
    }
  | undefined
>({
  playerId: "fgh",
  action: "attack",
});

const self = {
  id: "fgh",
  cards: [
    { rank: "K", suit: "♥" },
    { rank: "7", suit: "♠" },
    { rank: "9", suit: "♦" },
    { rank: "J", suit: "♠" },
    { rank: "A", suit: "♠" },
    { rank: "K", suit: "♣" },
  ] satisfies Card[],
};

const isSelfAllowed = computed(() => self.id === allowed.value?.playerId);

provide(
  "selfCards",
  computed(() => self.cards),
);

const slots = ref(Array.from({ length: 6 }, () => ({ })));

provide(
  "deskSlotKeys",
  computed(() => Array.from(slots.value).map((_, index) => index + 1)),
);

const talon = {
  isEmpty: false,
  hasOneCard: false,
  trumpCard: {
    rank: "10",
    suit: "♠",
  } as const,
};

const discard = {
  isEmpty: false,
};

const enemiesBySides = {
  top: [
    {
      cardCount: 6,
      id: "asd",
      isAllowedToMove: false,
      kind: "Defender",
      info: {
        id: "asd",
        isAdmin: false,
        profile: {
          connectStatus: "ONLINE",
          nickname: "Anon",
          personalLink: "link-asd",
          photoUrl:
            "https://cdn.7tv.app/emote/01GB9W6V0000098BZVD7GKTW0F/4x.avif",
          userId: "asd",
        },
      },
    } as const,
  ],
  left: [],
  right: [],
};

////////////////////////////////////////////////////////

const cardSchema = v.object({
  rank: v.string(),
  suit: v.string(),
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
    const { card, slotIndex } = v.parse(eventDetailSchema, event.detail);
    const slot = slots.value[slotIndex];
    if (!("attackCard" in slot)) {
      slot.attackCard = card;
    } else if (!("defendCard" in slot)) {
      slot.defendCard = card;
    }
  } catch (error) {
    console.error("Invalid event detail:", error);
  }
});
</script>
