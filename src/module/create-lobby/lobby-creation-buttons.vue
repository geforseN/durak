<template>
  <button
    v-show="!isCreatingLobby"
    class="text-2xl text-gray-900 border-2 border-primary btn btn-lg bg-success shadow-lg shadow-success/90 hover:bg-success hover:saturate-[1.3]"
    @click="$emit('toggle')"
  >
    Начать создание комнаты
  </button>

  <button
    v-show="isCreatingLobby"
    class="text-2xl text-gray-900 border-2 border-primary btn btn-lg bg-error shadow-lg shadow-error/90 hover:bg-error hover:saturate-[0.8]"
    @click="$emit('toggle')"
  >
    Отменить создание комнаты
  </button>
</template>

<script setup lang="ts">
defineProps<{ isCreatingLobby: boolean }>();
defineEmits<{ (event: "toggle"): void }>();
</script>
