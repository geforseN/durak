<template>
  <nav
    class="navbar sticky top-0 z-10 flex max-h-16 items-end border-b border-b-neutral bg-primary/50"
  >
    <ul class="contents">
      <list-item-link to="/">
        <icons-home />
      </list-item-link>
      <li class="ml-auto" />
      <app-theme-select />
      <li class="mr-2" />
      <user-avatar />
    </ul>
  </nav>
</template>
<script setup lang="ts">
import AppThemeSelect from "@/components/app-theme-select.vue";
import ListItemLink from "@/components/top-nav/list-item-link.vue";
import UserAvatar from "@/components/top-nav/user-avatar.vue";

import IconsHome from "@/components/svg/Home.vue";
</script>
