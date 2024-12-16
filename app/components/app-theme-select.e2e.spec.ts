import { expect, test } from "@playwright/test";

test.describe("AppThemeSelect", () => {
  test("should change app colors", async ({ page }) => {
    await page.goto("/");
    let isMobile = false;
    try {
      const eh = await page.$(
        '[data-testid="top-nav"] > [data-testid="app-theme-select"]',
      );
      if (!eh || (await eh.isHidden())) {
        throw new Error();
      }
    } catch {
      isMobile = true;
    }
    if (isMobile) {
      await page.getByTestId("app-drawer-open-burger-button").click();
    }
    const themeSelect = page.getByTestId("app-theme-select");
    await themeSelect.selectOption("Dark");
    if (isMobile) {
      await page.getByTestId("app-drawer-close-button").click();
    }
    await expect(page).toHaveScreenshot();
    if (isMobile) {
      await page.getByTestId("app-drawer-open-burger-button").click();
    }
    await themeSelect.selectOption("Light");
    if (isMobile) {
      await page.getByTestId("app-drawer-close-button").click();
    }
    await expect(page).toHaveScreenshot();
  });
});
