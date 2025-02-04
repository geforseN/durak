import { expect, test, type Page } from "@playwright/test";

const isMobilePage = async (page: Page) => {
  try {
    const eh = await page.$(
      '[data-testid="top-nav"] > [data-testid="app-theme-select"]',
    );
    if (!eh || (await eh.isHidden())) {
      throw new Error();
    }
    return false;
  } catch {
    return true;
  }
};

test.describe("AppThemeSelect", () => {
  test("should change app colors", async ({ page }) => {
    await page.goto("/");
    const isMobile = await isMobilePage(page);
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
