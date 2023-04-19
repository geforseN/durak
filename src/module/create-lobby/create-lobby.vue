<template>
  <div class="flex items-center flex-col gap-y-6">
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
import { ref } from "vue";
import LobbyCreationButtons from "@/module/create-lobby/lobby-creation-buttons.vue";
import LobbyCreationPopup from "@/module/create-lobby/lobby-creation-popup.vue";

const isCreatingLobby = ref(false);

const handleLobbyCreated = () => {
  isCreatingLobby.value = false;
};
const toggle = () => (isCreatingLobby.value = !isCreatingLobby.value);
</script>
