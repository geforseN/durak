import { ref } from "vue";

export function useAppDrawer() {
  const isDrawerOpenButtonClickedOnce = ref(false);
  const isDrawerOpen = ref(false);

  return {
    isOpen: isDrawerOpen,
    openButton: {
      handleClick: () => {
        isDrawerOpen.value = !isDrawerOpen.value;
        if (!isDrawerOpenButtonClickedOnce.value) {
          isDrawerOpenButtonClickedOnce.value = true;
        }
      },
      isClickedOnce: isDrawerOpenButtonClickedOnce,
    },
  };
}
