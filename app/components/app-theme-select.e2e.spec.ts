import { expect, test } from "@playwright/test";

test.describe("AppThemeSelect", () => {
  test("should change app colors", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("app-theme-select").selectOption("Dark");
    await expect(page).toHaveScreenshot();
    await page.getByTestId("app-theme-select").selectOption("Light");
    await expect(page).toHaveScreenshot();
  });
});
