<template>
  <router-link
    :to
    class="btn btn-square btn-outline rounded"
    :class="[
      userAvatarProps.size === 'small' ? 'btn-sm' : 'btn-md',
    ]"
    active-class="shadow-lg shadow-primary"
  >
    <user-avatar v-bind="userAvatarProps" />
  </router-link>
</template>
<script setup lang="ts">
import { computed } from "vue";
import UserAvatar, {
  type UserAvatarProps,
} from "$/user-avatar/components/user-avatar.vue";

const props = defineProps<
  UserAvatarProps & {
    to?: string;
  }
>();

const userAvatarProps = computed(() => {
  return {
    user: props.user,
    size: props.size,
  } satisfies UserAvatarProps;
});

const to = computed(() =>
  props.to
    ? props.to
    : `/profile/${userAvatarProps.value.user.profile.personalLink}`,
);
</script>
