<template>
  <div
    class="flex h-8 items-center rounded border border-black px-1 text-xs xs:h-12 xs:gap-2 xs:px-2 xs:text-base"
  >
    <div class="flex max-w-[6rem] flex-wrap justify-center gap-x-1 font-bold">
      <span>Anonymous&nbsp;</span><span>account</span>
    </div>
    <div
      class="tooltip tooltip-info flex h-5 w-5 items-center justify-center rounded border border-black bg-black text-white before:top-5 before:max-w-[12rem] before:text-xs before:xs:top-6 before:xs:text-base"
      :class="tooltipSideClasses[tooltipSide]
      "
      data-tip="All game progress is not saved when playing in an anonymous account"
    >
      ?
    </div>
  </div>
</template>
<script lang="ts">
const tooltipSideClasses = {
  left: "tooltip-left",
  right: "tooltip-right",
  top: "tooltip-top",
  bottom: "tooltip-bottom",
}
</script>
<!-- FIXME: i18n -->
<script setup lang="ts">
const { tooltipSide = "left" } = defineProps<{
  tooltipSide?: "left" | "right" | "top" | "bottom";
}>();
</script>
