import { readonly, ref, type Ref } from "vue";

type Nullish<T> = T | null | undefined;

export default function useCreateGameLobbyModal(
  element: Ref<Nullish<{ show(): void; close(): void }>>,
  defaultValue = false,
) {
  const mustShow = ref(defaultValue);

  return {
    mustShow: readonly(mustShow),
    show() {
      element.value!.show();
      mustShow.value = true;
    },
    close() {
      element.value!.close();
      mustShow.value = false;
    },
  };
}
