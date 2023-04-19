<template>
  <form class="px-6 pt-4 pb-2 flex flex-col border-4 border-primary rounded-lg bg-secondary text-2xl">
    <h2 class="text-4xl font-semibold">Параметры комнаты</h2>
    <radio-input-group group-id="radio-player-count" name="max-user-count" :input-values="allowedMaxUserCount"
      v-model:input.number="lobbySettings.maxUserCount">
      <template #header>
        <h3>Количество игроков:</h3>
      </template>
    </radio-input-group>
    <radio-input-group group-id="radio-card-count" name="card-count" :input-values="properCardCountValues"
      v-model:input.number="lobbySettings.cardCount">
      <template #header>
        <h3>Количество карт:</h3>
      </template>
    </radio-input-group>
    <select-group
      v-model="lobbySettings.gameType"
      id="game-types"
      :options="allowedGameTypes"
      :options-dictionary="gameTypesDictionary">
      Тип игры
    </select-group>
    <button
      class="mt-4 btn btn-lg bg-success border-info border-2 text-3xl font-bold hover:bg-success hover:border-info hover:hover:saturate-[1.3]"
      @click.prevent="createLobby()">
      Создать комнату
    </button>
    <button class="my-1 text-base w-fit mx-auto px-2 py-0.5" type="reset" @click.prevent="resetSettings()">
      Сброс параметров
    </button>
  </form>
</template>
<script setup lang="ts">
import { gameLobbies } from "@/socket";
import RadioInputGroup from "./lobby-creation-radio-input-group.vue";
import SelectGroup from "./lobby-creation-select.vue";
import gameTypesDictionary from "@/utils/dictionary/game-types.dictionary";
import useLobbySettings, {
  allowedGameTypes,
  allowedMaxUserCount,
} from "./useLobbySettings";
import { useNotificationStore } from "@/stores/notification.store";

const emit = defineEmits<{
  (e: "lobbyCreated"): void;
}>();

const {
  lobbySettings,
  properCardCountValues,
  resetSettings,
  isProperCardCount,
} = useLobbySettings();
const { addNotificationInQueue } = useNotificationStore();

const createLobby = () => {
  if (!isProperCardCount(lobbySettings.cardCount)) {
    return addNotificationInQueue({ durationInMS: 7_000, message: `Нельзя создать лобби \n с количеством карт: ${lobbySettings.cardCount}\n и количеством карт: ${lobbySettings.maxUserCount}` })
  }
  emit("lobbyCreated");
  gameLobbies.emit("createLobby", lobbySettings);
};
</script>
