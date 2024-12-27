<template>
  <!-- <DurakGame>
      <template #talon>
        <GameTalon />
      </template>
    </DurakGame> -->
  <pre>
    {{ gameId }}
    <JsonViewer
      v-if="data"
      :data
    />
  </pre>
</template>
<script setup lang="ts">
// import DurakGame from "./_durak-game.vue";
// import GameTalon from "$/card-game/components/game/GameTalon.vue";
// import { useNoCardCountTalon } from "$/card-game/composable/talon/useNoCardCountTalon";
import JsonViewer from "./json-viewer.vue";
import { useWebSocket } from "@vueuse/core";
import { ref } from "vue";

const { gameId } = defineProps<{
  gameId: string;
}>();

// const socket = makeDurakGameSocket(gameId);
const data = ref();
// const asyncGameState = Promise.withResolvers<GameState>();
useWebSocket(`ws://localhost:10000/games/${gameId}`, {
  onMessage(ws, event) {
    console.log(event);
    data.value = JSON.parse(event.data);
  },
});

// socket.on("connect_error", (err) => {
//   // the reason of the error, for example "xhr poll error"
//   console.log(err.message);

//   // some additional description, for example the status code of the initial HTTP response
//   console.log(err.description);

//   // some additional context, for example the XMLHttpRequest object
//   console.log(err.context);
// });

// socket.on('game::state::restore', (payload) => {
//   console.log({ payload })
//   asyncGameState.resolve(payload.state)
// })
// const gameState = await asyncGameState.promise

// socket.on("talon::madeDistribution")
// const talon = useNoCardCountTalon(gameState.talon);

// desk.on("card::clear", deskStore.clear)
// desk.on("card::receive", deskStore.insertCard)
// discard.on("cards::receive", (discard) => )
// talon.on("distribution::make", )
// self.on("cards::receive", playersStore.putCardsToPlayer)
// self.on("card::drop-attempt", playersStore.putCardsToPlayer)
// enemy.on("cards::receive", playersStore.putCardsToPlayer)
// enemy.on("card::drop-attempt", playersStore.putCardsToPlayer)
// player.on("changedKind", playersStore.changePlayerKind)

//  on game state restore =>
// self must have cards with isTrump
// this can be done through talon.trumpCard
// this should be done on server
</script>
