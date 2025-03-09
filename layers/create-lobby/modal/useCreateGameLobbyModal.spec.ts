import { describe, expect, test } from "vitest";
import useCreateGameLobbyModal from "./useCreateGameLobbyModal";
import { computed } from "vue";

describe("useCreateGameLobbyModal", () => {
  const badElements = [undefined, null] as const;

  const composableMethodNames = ["show", "close"] as const;

  describe.each(badElements)("`element` arg is ref with %s value", (value) => {
    test.for(composableMethodNames)(
      "must throw when `%s` method called",
      (methodName) => {
        const composable = useCreateGameLobbyModal(computed(() => value));
        expect(() => composable[methodName]()).toThrowErrorMatchingSnapshot();
      },
    );
  });

  describe("`element` arg is ref with $element value and `defaultValue` arg is not provided", () => {
    const makeComposable = () =>
      useCreateGameLobbyModal(
        computed(() => ({
          show() {},
          close() {},
        })),
      );

    const defaultValue = false;

    test(`default value is ${defaultValue}`, () => {
      const composable = makeComposable();
      expect(composable.mustShow.value).toBe(defaultValue);
    });

    describe.each([
      ["close", false],
      ["show", true],
    ] as const)(
      `value of mustShow after '%s' call`,
      (methodName, mustShowValueAtEnd) => {
        test(`must be \`${mustShowValueAtEnd}\``, () => {
          const composable = makeComposable();
          composable[methodName]();
          expect(composable.mustShow.value).toBe(mustShowValueAtEnd);
        });
      },
    );
  });
});
