<template>
  <form class="border border-black p-4 mx-2 flex flex-col">
    <h2 class="text-4xl">Параметры комнаты</h2>
    <!--    -->
    <div id="radio-player-count" class="my-4 flex gap-3 w-full items-center">
      <h3>Количество игроков:</h3>
      <div class="flex justify-between gap-x-4">
        <div
          v-for="maxUserCount of allowedMaxUserCount"
          :key="maxUserCount"
          class="relative w-8 h-8 flex flex-col items-center justify-center rounded-sm border-2 border-black"
          :class="maxUserCount === lobbySettings.maxUserCount && 'border-2 border-orange-500'"
        >
          <input
            class="w-0 h-0 focus:outline focus:outline-2 focus:outline-cyan-400 focus:outline-offset-[18px]"
            v-model="lobbySettings.maxUserCount"
            type="radio"
            name="max-user-count"
            :value="maxUserCount"
            :id="`max-user-count#${maxUserCount}`"
          />
          <label
            :for="`max-user-count#${maxUserCount}`"
            class="absolute w-full select-none text-3xl flex justify-center items-center"
          >
            {{ maxUserCount }}
          </label>
        </div>
      </div>
    </div>
    <!--    -->
    <div id="radio-player-count" class="my-4 flex gap-3 w-full items-center justify-between">
      <h3>Количество карт:</h3>
      <div class="flex justify-between gap-x-4">
        <template v-for="cardCount of allowedCardCount">
          <div
            v-if="canMakeFirstDistribution(cardCount)"
            :key="cardCount"
            class="relative w-8 h-8 flex flex-col items-center justify-center rounded-sm border-2 border-black"
            :class="cardCount === lobbySettings.cardCount && 'border-2 border-orange-500'"
          >
            <input
              class="w-0 h-0 focus:outline focus:outline-2 focus:outline-cyan-400 focus:outline-offset-[18px]"
              v-model="lobbySettings.cardCount"
              type="radio"
              name="card-count"
              :value="cardCount"
              :id="`card-count#${cardCount}`"
            />
            <label
              :for="`card-count#${cardCount}`"
              class="absolute w-full select-none text-2xl flex justify-center items-center"
            >
              {{ cardCount }}
            </label>
          </div>
        </template>
      </div>
    </div>
    <!--    -->
    <div id="select-game-type" class="my-4 flex gap-3 w-full items-center justify-between">
      <h3><label for="game-types">Тип игры</label></h3>
      <div>
        <select v-model="lobbySettings.gameType" id="game-types">
          <option v-for="gameType of allowedGameTypes" :value="gameType">
            {{ gameTypesDictionary[gameType] || gameType }}
          </option>
        </select>
      </div>
    </div>
    <button
      class="w-full bg-green-600 p-2 border-2 border-black text-2xl font-bold active:scale-95 focus:bg-green-700 transition"
      @click.prevent="createLobby()"
    >
      Создать комнату
    </button>
    <button type="reset" @click="resetSettings()">Сброс</button>
  </form>
</template>
<script setup lang="ts">
import { reactive, watch } from "vue";
import { gameLobbies } from "@/socket";
import gameTypesDictionary from "@/utils/game-types-dictionary";
import type {
  MaxUserCount,
  CardCount,
  GameType,
  LobbySettings,
} from "@/module/game-lobbies/types";

const allowedMaxUserCount: MaxUserCount[] = [2, 3, 4, 5, 6];
const allowedCardCount: CardCount[] = [24, 36, 52];
const allowedGameTypes: GameType[] = ["basic", "perevodnoy"];

const defaultMaxUserCount = 2;
const defaultCardCount = 36;
const defaultGameType = "basic";

const lobbySettings = reactive<LobbySettings>({
  maxUserCount: defaultMaxUserCount,
  gameType: defaultGameType,
  cardCount: defaultCardCount,
});

const resetSettings = () => {
  lobbySettings.maxUserCount = defaultMaxUserCount;
  lobbySettings.gameType = defaultGameType;
  lobbySettings.cardCount = defaultCardCount;
};

const canMakeFirstDistribution = (cardCount: number) => cardCount - lobbySettings.maxUserCount * 6 >= 0;

watch(lobbySettings, (newLS, oldLS) => {
  if (!canMakeFirstDistribution(oldLS.cardCount)) {
    const index = allowedCardCount.findIndex((count) => count === oldLS.cardCount);
    newLS.cardCount = allowedCardCount[index + 1];
  }
})

const createLobby = () => {
  let { gameType, maxUserCount, cardCount } = lobbySettings;
  if (!canMakeFirstDistribution(cardCount)) {}
  console.log({ gameType, maxUserCount, cardCount });
  gameLobbies.emit("createLobby", { gameType, maxUserCount, cardCount });
};
</script>
