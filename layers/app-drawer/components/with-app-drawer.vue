<template>
  <div class="drawer drawer-end">
    <input
      id="app-drawer"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content">
      <slot />
    </div>
    <div
      class="drawer-side z-[2]"
      v-bind="$attrs"
    >
      <label
        for="app-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      />
      <slot name="content" />
    </div>
  </div>
</template>
