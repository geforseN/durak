<template>
  <div class="flex-grow flex justify-center items-center bg-gray-800">
    <div v-for="player of players">
      <div class="bg-red-500 w-24 h-24">
        {{ player.accname }} {{ player.cardCount }}
      </div>
    </div>
  </div>
  <div class="absolute bottom-0 bg-gray-400 bottom-6 w-full flex justify-center">
    <div v-for="card of me.cards" class="border-2 rounded border-black h-[116px] bg-amber-300 w-[83px] flex block">
      <img class="hover:scale-125 transition ease-out" :src="`https://deckofcardsapi.com/static/img/${card.rank.at(-1)}${suitMap[card.suit]}.png`" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { io } from "socket.io-client";
import { onMounted, reactive, ref } from "vue";
import type { Card, Me, OtherPlayer, Rank, Suit } from "@/views/durak-games.help";

const players = ref<OtherPlayer[]>([]);
const me = ref<Me>({ cards: [] });

const host = import.meta.env.VITE_SOCKET_SERVER_ADDRESS;
const route = useRoute();
const gameSocket = io(`${host}/game/${route.params.gameId}`, { withCredentials: true });

onMounted(() => {
  gameSocket.emit("firstDistribution");
});

gameSocket.on("firstDistribution:me", (cards: Card[]) => {
  console.log("ME", cards);
  me.value.cards = cards;
});

gameSocket.on("playersIndexes", (indexes: { accname: string, index: number }[]) => {

})

gameSocket.on("firstDistribution", (accname: string, cardCount: number) => {
  console.log("OTHER", accname, cardCount);
  players.value;
});

const suitMap: Record<Suit, string> = {
  "♠": "S",
  "♥": "H",
  "♦": "D",
  "♣": "C",
}

</script>