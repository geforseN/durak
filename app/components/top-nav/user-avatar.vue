<template>
  <template v-if="userStore.user.error">
    <form :action="CREATE_ANON_USER_URL" method="post">
      <button
        @click="isCreatingAnonymousAccount = true"
        class="btn btn-accent"
        :class="isCreatingAnonymousAccount && 'loading'"
        type="submit"
      >
        Create anonymous account
      </button>
    </form>
  </template>
  <template v-else-if="userStore.user.state">
    <anonymous-user-caption v-if="userStore.user.state.isAnonymous" />
    <list-item-link
      v-if="userStore.user.state.profile"
      :to="`/profile/${userStore.user.state.profile.personalLink}`"
      class="ml-2 rounded border border-primary p-0"
      active-class="shadow-lg shadow-primary"
    >
      <img
        width="48"
        height="48"
        :src="userStore.user.state.profile.photoUrl"
        :alt="`${userStore.user.state.profile.nickname} profile picture`"
        :title="userStore.user.state.profile.nickname"
        class="rounded"
      />
    </list-item-link>
  </template>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import AnonymousUserCaption from "@/components/top-nav/anonymous-user-caption.vue";
import ListItemLink from "@/components/top-nav/list-item-link.vue";

import { useUserStore } from "@/stores";
import { CREATE_ANON_USER_URL } from "@/api/rest";

const isCreatingAnonymousAccount = ref(false);
const userStore = useUserStore();
</script>
