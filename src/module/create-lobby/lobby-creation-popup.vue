<template>
  <form
    class="p-4 flex flex-col border-[4px] border-primary bg-secondary text-2xl"
  >
    <h2 class="text-4xl font-semibold">Параметры комнаты</h2>
    <radio-input-group
      group-id="radio-player-count"
          name="max-user-count"
      :input-values="allowedMaxUserCount"
      v-model:input.number="lobbySettings.maxUserCount"
    >
      <template #header><h3>Количество игроков:</h3></template>
    </radio-input-group>
    <radio-input-group
      group-id="radio-card-count"
          name="card-count"
      :input-values="properCardCountValues"
      v-model:input.number="lobbySettings.cardCount"
    >
      <template #header><h3>Количество карт:</h3></template>
    </radio-input-group>
    <div
      id="select-game-type"
      class="my-4 flex gap-3 w-full items-center justify-between"
    >
      <h3><label for="game-types">Тип игры</label></h3>
      <div>
        <select
          class="select leading-8 select-bordered select-lg w-full max-w-xs"
          v-model="lobbySettings.gameType"
          id="game-types"
        >
          <option v-for="gameType of allowedGameTypes" :value="gameType">
            {{ gameTypesDictionary[gameType] || gameType }}
          </option>
        </select>
      </div>
    </div>
    <button
      class="mt-4 btn btn-lg bg-success border-info border-2 text-3xl font-bold hover:bg-success hover:border-info hover:hover:saturate-[1.3]"
      @click.prevent="createLobby()"
    >
      Создать комнату
    </button>
    <button
      class="my-1 text-base"
      type="reset"
      @click.prevent="resetSettings()"
    >
      Сброс параметров
    </button>
  </form>
</template>
<script setup lang="ts">
import { gameLobbies } from "@/socket";
import RadioInputGroup from "./lobby-creation-radio-input-group.vue";
import gameTypesDictionary from "@/utils/dictionary/game-types.dictionary";
import useLobbySettings, {
  allowedGameTypes,
  allowedMaxUserCount,
} from "./useLobbySettings";

const emit = defineEmits<{
  (e: "lobbyCreated"): void;
}>();

const {
  lobbySettings,
  properCardCountValues,
  resetSettings,
  isProperCardCount,
} = useLobbySettings();

const createLobby = () => {
  if (!isProperCardCount(lobbySettings.cardCount)) {
    // TODO SHOW USER REASON WHY LOBBY CAN NOT BE CREATED
    return;
  }
  emit("lobbyCreated");
  gameLobbies.emit("createLobby", lobbySettings);
};
</script>
