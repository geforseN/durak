<template>
  <template v-if="userStore.user.error">
    <form
      :action="CREATE_ANON_USER_URL"
      method="post"
    >
      <button
        class="btn btn-accent btn-sm xs:btn-md"
        :class="isCreatingAnonymousAccount && 'loading'"
        type="submit"
        @click="isCreatingAnonymousAccount = true"
      >
        Create anonymous account
      </button>
    </form>
  </template>
  <div class="contents" v-else-if="userStore.user.state">
    <anonymous-user-caption v-if="userStore.user.state.isAnonymous" />
    <list-item-link
      v-if="userStore.user.state.profile"
      :to="`/profile/${userStore.user.state.profile.personalLink}`"
      class="btn btn-sm xs:btn-md btn-square btn-outline gap-2 rounded border border-primary p-0 align-middle"
      active-class="shadow-lg shadow-primary"
    >
      <img
        :width="isExtraSmall ? 36 : 48"
        :height="isExtraSmall ? 36 : 48"
        :src="userStore.user.state.profile.photoUrl"
        :alt="`${userStore.user.state.profile.nickname} profile picture`"
        :title="userStore.user.state.profile.nickname"
        class="rounded"
      >
    </list-item-link>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useBreakpoints } from "@vueuse/core";
import breakpointsTailwind from "../../../tailwind.screens";

import AnonymousUserCaption from "@/components/top-nav/anonymous-user-caption.vue";
import ListItemLink from "@/components/top-nav/list-item-link.vue";

import { useUserStore } from "@/stores";
import { CREATE_ANON_USER_URL } from "@/api/rest";

const isCreatingAnonymousAccount = ref(false);
const userStore = useUserStore();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isExtraSmall = breakpoints.smallerOrEqual("xs");
</script>
