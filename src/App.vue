<template>
  <available-rooms :rooms="mockRoomsData" />
</template>

<script setup lang="ts">
  import { mockRoomsData } from "@/mock/available-rooms.mock";
  import AvailableRooms from "@/components/available-rooms.vue";

</script>

<style scoped></style>
