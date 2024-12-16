<template>
  <div
    class="relative z-20 flex min-h-full w-full flex-col gap-1 bg-base-200 pr-4 pt-4 text-base-content xs:w-80"
    data-testid="app-drawer-default-content"
  >
    <div class="relative -top-2 right-2 flex w-full justify-end">
      <app-drawer-close-button />
    </div>
    <div
      v-if="userStore.user.state"
      class="mx-2 flex items-center justify-between rounded border-2 border-base-content/50 bg-primary p-2 text-primary-content"
    >
      <anonymous-user-caption
        v-if="userStore.user.state.isAnonymous"
        tooltip-side="bottom"
      />
      <span v-else>
        {{ userStore.user.state.profile.nickname }}
      </span>
      <user-avatar-as-link
        class="justify-end"
        :user="userStore.user.state"
        size="medium"
      />
    </div>
    <div
      class="mx-2 flex justify-between rounded border-2 border-base-content/50 p-2"
    >
      <!-- prettier-ignore -->
      <label
        :for="appThemeSelectId"
        class="label w-full cursor-pointer"
      >
        Theme
      </label>
      <app-theme-select
        :id="appThemeSelectId"
        v-model="appStore.theme.selected"
        :values="Object.entries(appStore.theme.record)"
      />
    </div>
    <lobbies-top-nav v-if="userStore.user.state" />
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, useId } from "vue";
import AppDrawerCloseButton from "$/app-drawer/components/app-drawer-close-button.vue";
import UserAvatarAsLink from "$/user-avatar/components/user-avatar-as-link.vue";
import AppThemeSelect from "$/app-theme/components/app-theme-select.vue";
import lobbiesTopNav from "$/game-lobbies/components/lobbies-top-nav.vue";
import { useAppStore, useUserStore } from "@/stores";

const AnonymousUserCaption = defineAsyncComponent(
  () => import("$/user-auth/components/anonymous-user-caption.vue"),
);

const appStore = useAppStore();
const userStore = useUserStore();

const appThemeSelectId = useId();
</script>
