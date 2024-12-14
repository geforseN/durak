<template>
  <nav
    class="navbar gap-1 xs:gap-2 sticky top-0 z-10 flex h-12 min-h-0 items-end border-b border-b-neutral bg-primary/50 xs:h-16"
  >
    <ul class="contents">
      <list-item-link
        class="btn btn-outline btn-sm border align-middle xs:btn-md"
        to="/"
      >
        <icons-home />
      </list-item-link>
      <li class="ml-auto" />
      <app-theme-select class="select-sm xs:select-md" />
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
