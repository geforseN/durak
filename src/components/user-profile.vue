<template>
  <main class="w-full h-max mr-auto mt-9 flex justify-center">
    <section
      class="bg-slate-500 flex flex-col p-6 w-full max-w-5xl border-black border-2 rounded max-lg:border-0 max-lg:rounded-none">
      <h1 class="text-3xl font-semibold mb-4">Профиль игрока {{ profile.nickname }}</h1>
      <div class="flex flex-wrap gap-8 ">
        <div class="avatar w-min indicator">
          <span class="indicator-item top-6 right-6 badge w-7 h-7" :class="indicatorColor" />
          <div class="w-40 h-40 rounded-full border-4 border-neutral box-content">
            <img width="160" height="160" :src="profile.photoUrl" :alt="`${profile.nickname} profile picture`" />
          </div>
        </div>
        <div
          class="flex flex-col divide-y-2 divide-slate-700 gap-y-2 border border-neutral rounded p-4 bg-slate-400/20">
          <span class="text-xl font-medium">Количество побед: 10</span>
          <span class="text-xl font-medium">Количество поражений: 10</span>
          <span class="text-xl font-medium">Процент: 50%</span>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onUnmounted, reactive } from "vue";

const route = useRoute();
const { VITE_FASTIFY_SERVER_URI: host } = import.meta.env;
const { personalLink } = route.params;


const controller = new AbortController();
const profileData = await fetch(new Request(`${host}/profile?personalLink=${personalLink}`, {
  method: "GET",
  mode: "cors",
  signal: controller.signal,
}));
const profile = reactive<any>(await profileData.json());
const indicatorColor = computed(() => {
  switch (profile.connectStatus) {
    case "ONLINE":
      return "bg-green-400";
    case "AWAY":
      return "bg-yellow-400";
    case "OFFLINE":
      return "bg-gray-400";
    default:
      return "bg-gray-100";
  }
});
onUnmounted(() => controller.abort());
</script>