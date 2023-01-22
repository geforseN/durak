<template>
  <lobby-creation-buttons :isCreatingLobby="isCreatingLobby" @toggle="toggle" />
  <lobby-creation-popup v-show="isCreatingLobby" />
</template>

<script setup lang="ts">
import LobbyCreationButtons from "@/module/create-lobby/lobby-creation-buttons.vue";
import LobbyCreationPopup from "@/module/create-lobby/lobby-creation-popup.vue";
import { ref } from "vue";

const isCreatingLobby = ref(false);
const toggle = () => (isCreatingLobby.value = !isCreatingLobby.value);
</script>
