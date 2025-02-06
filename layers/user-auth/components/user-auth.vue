<template>
  <template v-if="userStore.user.error">
    <create-anonymous-account-form />
  </template>
  <div
    v-else-if="userStore.user.state"
    class="contents"
  >
    <lobbies-top-nav v-if="!isSmall" />
    <anonymous-user-caption
      v-if="userStore.user.state.isAnonymous"
      :size="isSmall ? 'small' : 'medium'"
    />
    <user-avatar-as-link
      :user="userStore.user.state"
      :size="isSmall ? 'small' : 'medium'"
    />
  </div>
</template>
<!-- TODO: refactor -->
<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue";
import { useUserStore, useAppStore } from "@/stores";
import UserAvatarAsLink from "$/user-avatar/components/user-avatar-as-link.vue";
import LobbiesTopNav from "$/game-lobbies/components/lobbies-top-nav.vue";
import CreateAnonymousAccountForm from "$/user-auth/components/create-anonymous-account-form.vue";

const AnonymousUserCaption = defineAsyncComponent(
  () => import("$/user-auth/components/anonymous-user-caption.vue"),
);

const userStore = useUserStore();

const appStore = useAppStore();

const isSmall = computed(() => appStore.screen.isExtraSmall);
</script>
