<template>
  <button v-if="!isCreatingLobby" class="min-w-[20rem] mx-auto p-4 self-end font-bold w-max bg-blue-600"
          @click="$emit('toggle')">
    Начать создание комнаты
  </button>
  <button v-if="isCreatingLobby" class="min-w-[20rem] mx-auto p-4 self-end font-bold w-max bg-red-600"
          @click="$emit('toggle')">
    Отменить создание комнаты
  </button>
</template>

<script setup lang="ts">
defineProps<{ isCreatingLobby: boolean }>();
defineEmits<{ (event: "toggle"): void }>();
</script>
