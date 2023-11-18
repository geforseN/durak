<template>
  <dialog ref="modalRef" class="modal text-xl min-[350px]:text-2xl">
    <section class="modal-box flex flex-col border-4 border-primary">
      <div class="flex justify-between">
        <h2
          class="text-2xl font-semibold min-[350px]:text-3xl min-[420px]:text-4xl"
        >
          Параметры комнаты
        </h2>
        <form method="dialog">
          <button
            title="Отменить создание игровой комнаты"
            class="btn btn-square bg-error transition-colors hover:bg-error hover:saturate-150"
          >
            <span class="sr-only">Отменить создание игровой комнаты</span>
            <x-mark class="stroke-black stroke-[3] p-1" aria-hidden="true" />
          </button>
        </form>
      </div>
      <radio-input-group
        name="player-count"
        class="my-2"
        :input-values="allowedUserCount"
        v-model.number="lobbySettings.userCount"
      >
        Количество игроков
      </radio-input-group>
      <radio-input-group
        class="my-2"
        name="card-count"
        :input-values="properCardCountValues"
        v-model.number="lobbySettings.cardCount"
      >
        Количество карт
      </radio-input-group>
      <select-group
        class="my-2"
        id="game-type"
        :options="allowedGameTypes"
        :options-dictionary="gameTypesDictionary"
        v-model="lobbySettings.gameType"
      >
        Тип игры
      </select-group>
      <form method="dialog">
        <button
          class="btn btn-accent btn-lg h-auto w-full text-3xl"
          @click="createLobby()"
        >
          Создать комнату
        </button>
      </form>
      <button
        type="reset"
        class="mx-auto my-1 w-fit px-2 py-0.5 text-base"
        @click.prevent="resetSettings()"
      >
        Сброс параметров
      </button>
    </section>
    <form method="dialog" class="modal-backdrop bg-black/50">
      <button>Отменить создание игровой комнаты</button>
    </form>
  </dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";

import XMark from "@/components/svg/XMark.vue";
import RadioInputGroup from "./lobby-creation-radio-input-group.vue";
import SelectGroup from "./lobby-creation-select.vue";

import gameTypesDictionary from "@/utils/dictionary/game-types.dictionary";

import useLobbySettings, {
  allowedGameTypes,
  allowedUserCount,
} from "./useLobbySettings";
import { useNotificationStore } from "@/stores/notification.store";
import { useGameLobbiesStore } from "@/stores/useGameLobbiesStore";

const modalRef = ref<HTMLDialogElement | null>(null);
defineExpose({ modalRef });

const {
  lobbySettings,
  properCardCountValues,
  resetSettings,
  isProperCardCount,
} = useLobbySettings();
const { addNotificationInQueue } = useNotificationStore();

const gameLobbiesStores = useGameLobbiesStore();

const createLobby = () => {
  if (!isProperCardCount()) {
    return addNotificationInQueue({
      durationInMS: 7_000,
      message: `Нельзя создать лобби \n с количеством карт: ${lobbySettings.cardCount}\n и количеством карт: ${lobbySettings.userCount}`,
    });
  }
  gameLobbiesStores.createLobby(lobbySettings);
};
</script>
