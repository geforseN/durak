import { provide } from "vue";
import { injectOrThrow } from "@/utils/vue/inject-or-throw";
import type useCreateGameLobbyModal from "./useCreateGameLobbyModal";

type Inject = ReturnType<typeof useCreateGameLobbyModal>;

const __key = "createGameLobbyModal";

export function injectCreateGameLobbyModalOrThrow() {
  return injectOrThrow<Inject>(__key);
}

export function provideCreateGameLobbyModal(value: Inject) {
  return provide<Inject>(__key, value);
}
