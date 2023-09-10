<template>
  <template v-if="userStore.isUserDataLoaded">
    <anonymous-user-caption
      v-if="userStore.user.isAnonymous"
    ></anonymous-user-caption>
    <li class="ml-2">
      <router-link
        :to="`/profile/${userStore.user.profile.personalLink}`"
        class="h-12 w-12 rounded border border-primary"
        active-class="shadow-lg shadow-primary"
      >
        <img
          :src="userStore.user.profile.photoUrl"
          :alt="`${userStore.user.profile.nickname} profile picture`"
          :title="userStore.user.profile.nickname"
          class="rounded"
        />
      </router-link>
    </li>
  </template>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/stores/user.store";
import AnonymousUserCaption from "./anonymous-user-caption.vue";

const userStore = useUserStore();
await userStore.getMe();
</script>
