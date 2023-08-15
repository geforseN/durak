<template>
  <li v-if="userStore.user.profile.nickname">
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
    <div v-if="userStore.user.isAnonymous">JOKERGE</div>
  </li>
  <template v-else>
    <list-item-link to="/auth/registration">Зарегистрироваться</list-item-link>
    <li class="ml-2" />
    <list-item-link to="/auth/login">Войти</list-item-link>
  </template>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/stores/user.store";

const userStore = useUserStore();
await userStore.getMe();
</script>
