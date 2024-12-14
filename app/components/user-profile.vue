<template>
  <main class="mr-auto mt-9 flex h-max w-full justify-center">
    <section
      class="flex w-full max-w-5xl flex-col rounded border-2 border-black bg-slate-500 p-6 max-lg:rounded-none max-lg:border-0"
    >
      <h1 class="mb-4 text-3xl font-semibold">
        Профиль игрока {{ profile.nickname }}
      </h1>
      <div class="flex flex-wrap gap-8">
        <div class="avatar indicator w-min">
          <span
            class="badge indicator-item right-6 top-6 h-7 w-7"
            :class="indicatorColor[profile.connectStatus]"
          />
          <div
            class="box-content h-40 w-40 rounded-full border-4 border-neutral"
          >
            <img
              width="160"
              height="160"
              :src="profile.photoUrl"
              :alt="`${profile.nickname} profile picture`"
            >
          </div>
        </div>
        <div
          class="flex flex-col gap-y-2 divide-y-2 divide-slate-700 rounded border border-neutral bg-slate-400/20 p-4"
        >
          <span class="text-xl font-medium">Количество побед:
            {{ profile.User.UserGameStat.wonGamesCount }}</span>
          <span class="text-xl font-medium">Количество поражений:
            {{ profile.User.UserGameStat.lostGamesCount }}</span>
          <span class="text-xl font-medium">Процент:
            {{
              (
                (profile.User.UserGameStat.wonGamesCount /
                  (profile.User.UserGameStat.lostGamesCount +
                    profile.User.UserGameStat.wonGamesCount) || 0) * 100
              ).toFixed(2)
            }}%</span>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { onUnmounted, reactive } from "vue";

import { getProfileByLink } from "@/api/rest";

const { personalLink } = useRoute().params;

if (typeof personalLink !== "string") {
  throw new Error("personalLink must be a string");
}

const controller = new AbortController();
const profile = await reactive(getProfileByLink(personalLink, { controller }));

const indicatorColor = {
  ONLINE: "bg-green-400",
  AWAY: "bg-yellow-400",
  OFFLINE: "bg-gray-400",
};

onUnmounted(() => controller.abort());
</script>
