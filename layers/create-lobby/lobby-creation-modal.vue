<template>
  <dialog
    ref="modalRef"
    class="modal text-xl min-[350px]:text-2xl"
  >
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
            aria-label="Отменить создание игровой комнаты"
            class="btn btn-square btn-error"
          >
            <i-material-symbols-light-close />
          </button>
        </form>
      </div>
      <radio-input-group
        v-model.number="lobbySettings.state.playerCount"
        name="player-count"
        class="my-2"
        :input-values="lobbySettings.allowedValues.playerCount"
      >
        Количество игроков
      </radio-input-group>
      <radio-input-group
        v-model.number="lobbySettings.state.talonCardCount"
        class="my-2"
        name="card-count"
        :input-values="lobbySettings.allowedValues.talonCardCount.value"
      >
        Количество карт
      </radio-input-group>
      <select-group
        id="game-type"
        v-model="lobbySettings.state.gameType"
        class="my-2"
        :options="lobbySettings.allowedValues.durakGameTypes"
        :options-dictionary="gameTypesDictionary"
      >
        Тип игры
      </select-group>
      <form method="dialog">
        <button
          class="btn btn-accent btn-lg h-auto w-full text-3xl"
          @click="
            try {
              lobbySettings.assertValidLobbySettings();
              emit('create-lobby', lobbySettings.state);
            } catch {
              emit('failed-create-lobby');
            }
          "
        >
          Create Lobby
        </button>
      </form>
      <button
        type="reset"
        class="mx-auto my-1 w-fit px-2 py-0.5 text-base"
        @click.prevent="lobbySettings.resetToDefault()"
      >
        Сброс параметров
      </button>
    </section>
    <form
      method="dialog"
      class="modal-backdrop bg-black/50"
    >
      <button>Отменить создание игровой комнаты</button>
    </form>
  </dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { InitialGameSettings } from "@durak-game/durak-dts";

import gameTypesDictionary from "@/utils/dictionary/game-types.dictionary";

import useLobbySettings from "./useLobbySettings";
import RadioInputGroup from "./lobby-creation-radio-input-group.vue";
import SelectGroup from "./lobby-creation-select.vue";

const lobbySettings = useLobbySettings();

const emit = defineEmits<{
  "create-lobby": [InitialGameSettings];
  "failed-create-lobby": [];
}>();

const modalRef = ref<HTMLDialogElement | null>(null);

defineExpose({ modalRef });
</script>
