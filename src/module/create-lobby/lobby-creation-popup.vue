<template>
  <form
    class="w-full px-3 min-[350px]:px-4 sm:px-6 py-4 pb-2 text-xl min-[350px]:text-2xl
      flex flex-col border-4 border-primary rounded-lg bg-secondary">
    <h2 class="text-2xl min-[350px]:text-3xl min-[420px]:text-4xl font-semibold">Параметры комнаты</h2>
    <radio-input-group
      group-id="radio-player-count" name="max-user-count"
      :input-values="allowedMaxUserCount" v-model:input.number="lobbySettings.maxUserCount">
      Количество игроков
    </radio-input-group>
    <radio-input-group
      group-id="radio-card-count" name="card-count"
      :input-values="properCardCountValues" v-model:input.number="lobbySettings.cardCount">
      Количество карт
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
  if (!isProperCardCount()) {
    return addNotificationInQueue({
      durationInMS: 7_000,
      message: `Нельзя создать лобби \n с количеством карт: ${lobbySettings.cardCount}\n и количеством карт: ${lobbySettings.maxUserCount}`,
    });
  }
  emit("lobbyCreated");
  gameLobbies.emit("createLobby", lobbySettings);
};
</script>
