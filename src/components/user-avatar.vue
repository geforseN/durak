<template>
  <li v-if="userStore.user.profile.nickname">
    <div v-if="userStore.user.isAnonymous">
      <div
        class="tooltip"
        data-tip="All game progress is not saved when playing in an anonymous account"
      >
        <div>Anonymous account</div>
      </div>
    </div>
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
<script lang="ts" setup>
import { useUserStore } from "@/stores/user.store";

const userStore = useUserStore();
await userStore.getMe();
</script>
