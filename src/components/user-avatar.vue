<template>
  <form
    v-if="userStore.user.error"
    :action="CREATE_ANON_USER_URL"
    method="post"
  >
    <button
      @click="isCreatingAnonymousAccount = true"
      class="btn btn-accent"
      :class="isCreatingAnonymousAccount && 'loading'"
      type="submit"
    >
      Create anonymous account
    </button>
  </form>
  <template v-else-if="userStore.user.state">
    <anonymous-user-caption v-if="userStore.user.state.isAnonymous" />
    <li v-if="userStore.user.state.profile" class="ml-2">
      <router-link
        :to="`/profile/${userStore.user.state.profile.personalLink}`"
        class="h-12 w-12 rounded border border-primary"
        active-class="shadow-lg shadow-primary"
      >
        <img
          :src="userStore.user.state.profile.photoUrl"
          :alt="`${userStore.user.state.profile.nickname} profile picture`"
          :title="userStore.user.state.profile.nickname"
          class="rounded"
        />
      </router-link>
    </li>
  </template>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import AnonymousUserCaption from "@/components/anonymous-user-caption.vue";

import { useUserStore } from "@/stores";

import { CREATE_ANON_USER_URL } from "@/api/rest";

const isCreatingAnonymousAccount = ref(false);
const userStore = useUserStore();
</script>
