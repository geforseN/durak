<template>
  <div class="flex flex-col gap-8 items-stretch">
    <lobby-creation-buttons
      :isCreatingLobby="isCreatingLobby"
      @toggle="toggle"
    />
    <lobby-creation-popup
      v-show="isCreatingLobby"
      @lobby-created="handleLobbyCreated"
    />
  </div>
</template>

<script setup lang="ts">
import LobbyCreationButtons from "@/module/create-lobby/lobby-creation-buttons.vue";
import LobbyCreationPopup from "@/module/create-lobby/lobby-creation-popup.vue";
import { ref } from "vue";

const isCreatingLobby = ref(false);

const handleLobbyCreated = () => {
  isCreatingLobby.value = false;
};
const toggle = () => (isCreatingLobby.value = !isCreatingLobby.value);
</script>
