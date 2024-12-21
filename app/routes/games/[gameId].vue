<template>
  <Suspense>
    <durak-game :id="gameId" />
  </Suspense>
</template>
<script setup lang="ts">
import DurakGame from "$/card-game/components/_durak-game.vue";
import { getRouteStringParam } from "@/router/utils";

const gameId = getRouteStringParam("gameId");
</script>