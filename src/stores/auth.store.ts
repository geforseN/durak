import { defineStore } from "pinia";
import { ref } from "vue";

const useAuthStore = defineStore("auth", () => {
  const email = ref("");
  const accName = ref("");
  const password = ref("");
  const repeatedPassword = ref("");

  return {
    email,
    accName,
    password,
    repeatedPassword,
  };
});

export default useAuthStore;