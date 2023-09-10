<template>
  <form
    class="flex flex-col rounded-lg border-4 border-primary-focus bg-secondary-focus px-3 py-4 pb-2 text-xl min-[350px]:px-4 min-[350px]:text-2xl sm:px-6"
  >
    <h5 class="text-sm">ТУТ МОЖНО СКРОЛИТЬ</h5>
    <h5 class="text-sm">ВИДНО, ЧТО ПОДОЛОЖКА ИМЕЕТ ДЛИННУ 100vh</h5>
    <div class="flex justify-between">
      <h2
        class="text-2xl font-semibold min-[350px]:text-3xl min-[420px]:text-4xl"
      >
        Параметры комнаты
      </h2>
      <button
        ref="focused"
        type="button"
        class="btn-square btn bg-error transition-colors hover:bg-error/75"
        @click="emit('close')"
      >
        <x-mark
          class="h-full w-full stroke-black stroke-[3] p-1 transition-transform duration-500 ease-out"
        />
      </button>
    </div>
    <radio-input-group
      name="player-count"
      :input-values="allowedUserCount"
      v-model.number="lobbySettings.userCount"
    >
      Количество игроков
    </radio-input-group>
    <radio-input-group
      name="card-count"
      :input-values="properCardCountValues"
      v-model.number="lobbySettings.cardCount"
    >
      Количество карт
    </radio-input-group>
    <select-group
      id="game-type"
      :options="allowedGameTypes"
      :options-dictionary="gameTypesDictionary"
      v-model="lobbySettings.gameType"
    >
      Тип игры
    </select-group>
    <!-- <div class="flex justify-between">
      <label for="">Время хода</label>
      <div>
        <input type="number" v-model="lobbySettings.moveTime">
        {{ lobbySettings.moveTime }}
      </div>
    </div> -->
    <button
      class="btn-lg btn mt-4 h-auto border-2 border-info bg-success text-3xl font-bold hover:border-info hover:bg-success hover:hover:saturate-[1.3]"
      @click.prevent="createLobby()"
    >
      Создать комнату
    </button>
    <button
      type="reset"
      class="mx-auto my-1 w-fit px-2 py-0.5 text-base"
      @click.prevent="resetSettings()"
    >
      Сброс параметров
    </button>
  </form>
</template>
<script setup lang="ts">
import RadioInputGroup from "./lobby-creation-radio-input-group.vue";
import SelectGroup from "./lobby-creation-select.vue";
import gameTypesDictionary from "@/utils/dictionary/game-types.dictionary";
import useLobbySettings, {
  allowedGameTypes,
  allowedUserCount,
} from "./useLobbySettings";
import { useNotificationStore } from "@/stores/notification.store";
import XMark from "@/components/svg/XMark.vue";
import { ref, onMounted } from "vue";
import { useGameLobbiesStore } from "@/stores/useGameLobbiesStore";

defineOptions({ name: "LobbyCreationPopup" });

const emit = defineEmits<{
  (e: "lobbyCreated"): void;
  (e: "close"): void;
}>();

const {
  lobbySettings,
  properCardCountValues,
  resetSettings,
  isProperCardCount,
} = useLobbySettings();
const { addNotificationInQueue } = useNotificationStore();

const focused = ref<HTMLButtonElement>();

onMounted(() => {
  focused.value?.focus();
});
const gameLobbiesStores = useGameLobbiesStore();

const createLobby = () => {
  if (!isProperCardCount()) {
    return addNotificationInQueue({
      durationInMS: 7_000,
      message: `Нельзя создать лобби \n с количеством карт: ${lobbySettings.cardCount}\n и количеством карт: ${lobbySettings.userCount}`,
    });
  }
  emit("close");
  emit("lobbyCreated");
  gameLobbiesStores.createLobby(lobbySettings);
};
</script>
