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
            :slots="
              Array.from({ length: 6 }, () => ({
                attackCard: undefined,
                defendCard: undefined,
              }))
            "
            :class="_props.class"
          />
        </template>
      </with-board-layout>
    </with-enemies-by-sides>
    <self-interface />
  </main>
</template>
<script setup lang="ts">
import SelfInterface from "$/card-game/components/self/SelfInterface.vue";
import WithEnemiesBySides from "$/card-game/components/enemy/with-enemies-by-sides.vue";
import WithBoardLayout from "$/card-game/components/game/with-board-layout.vue";
import GameDiscard from "$/card-game/components/game/GameDiscard.vue";
import GameTalon from "$/card-game/components/game/GameTalon.vue";
import GameDesk from "$/card-game/components/game/GameDesk.vue";

const props = defineProps<{
  id: string;
}>();
</script>
