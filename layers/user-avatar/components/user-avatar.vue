<template>
  <!-- prettier-ignore -->
  <img
    :width="size === 'small' ? 36 : 48"
    :height="size === 'small' ? 36 : 48"
    :src="user.profile.photoUrl"
    :alt="`${user.profile.nickname} profile picture`"
    :title="user.profile.nickname"
    class="rounded" 
  >
</template>
<!-- FIXME: i18n -->
<script lang="ts">
import type { User } from "@/api/rest";

export type UserAvatarProps = {
  user: User;
  size?: "small" | "medium";
};
</script>
<script setup lang="ts">
defineProps<UserAvatarProps>();
</script>
