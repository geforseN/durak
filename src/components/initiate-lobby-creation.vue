<template>
  <form class="border border-black p-4 mx-2 flex flex-col">
    <h2 class="text-4xl">Параметры комнаты</h2>
    <div id="radio-player-count" class="my-4 flex gap-3 w-full items-center">
      <h3>Количество игроков:</h3>
      <div
        v-for="maxUserCount of allowedMaxUserCount"
        :key="maxUserCount"
        class="relative w-8 h-8 flex flex-col items-center justify-center rounded-sm"
        :class="colorizeMaxUserCountBorder(maxUserCount)"
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
    <div id="select-game-type" class="my-4 flex gap-3 w-full items-center">
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
      class="w-full bg-green-600 p-4 border-2 border-black text-2xl"
      @click.prevent="createLobby()"
    >
      Создать комнату
    </button>
    <button type="reset" @click="resetSettings()">Сброс</button>
  </form>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { gameLobbies } from "@/socket";
import gameTypesDictionary from "../utils/game-types-dictionary";
import type {
  GameType,
  MaxUserCount,
} from "@/module/game-lobbies/types/__config__.type";
import type { LobbySettings } from "@/module/game-lobbies/types/lobby-settings.type";

const allowedMaxUserCount: MaxUserCount[] = [2, 3, 4, 5, 6];
const allowedGameTypes: GameType[] = ["basic", "perevodnoy"];

const defaultMaxUserCount = 2;
const defaultGameType = "basic";

const lobbySettings = reactive<LobbySettings>({
  maxUserCount: defaultMaxUserCount,
  gameType: defaultGameType,
});

const resetSettings = () => {
  lobbySettings.maxUserCount = defaultMaxUserCount;
  lobbySettings.gameType = defaultGameType;
};

const createLobby = () => {
  const { gameType, maxUserCount } = lobbySettings;
  gameLobbies.emit("createLobby", { gameType, maxUserCount });
};

const colorizeMaxUserCountBorder = (maxUserCount: number) => {
  return maxUserCount === lobbySettings.maxUserCount
    ? "border-2 border-orange-500"
    : "border-2 border-black";
};

</script>
