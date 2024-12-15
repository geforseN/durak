<template>
  <template v-if="userStore.user.error">
    <form
      :action="CREATE_ANON_USER_URL"
      method="post"
    >
      <app-button-create-anonymous-user
        type="submit"
        @click="isCreatingAnonymousAccount = true"
      />
    </form>
  </template>
  <div
    v-else-if="userStore.user.state"
    class="contents"
  >
    <anonymous-user-caption
      v-if="userStore.user.state.isAnonymous"
      :size="isSmall ? 'small' : 'medium'"
    />
    <user-avatar-as-link
      v-if="userStore.user.state"
      :user="userStore.user.state"
      :size="isSmall ? 'small' : 'medium'"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, defineAsyncComponent } from "vue";
import UserAvatarAsLink from "$/user-avatar/components/user-avatar-as-link.vue";
import AppButtonCreateAnonymousUser from "$/user-auth/components/app-button-create-anonymous-user.vue";
import { useUserStore, useAppStore } from "@/stores";
import { CREATE_ANON_USER_URL } from "@/api/rest";

const AnonymousUserCaption = defineAsyncComponent(
  () => import("$/user-auth/components/anonymous-user-caption.vue"),
);

const isCreatingAnonymousAccount = ref(false);
const userStore = useUserStore();

const appStore = useAppStore();

const isSmall = computed(() => appStore.screen.isExtraSmall);
</script>
