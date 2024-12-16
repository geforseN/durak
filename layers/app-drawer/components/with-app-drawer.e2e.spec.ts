import { expect, test } from "@playwright/test";

// TODO: test cursor should not be moved to open/close drawer
// open drawer and close drawer buttons must be placed at same position

// TODO: login and add screenshot (must contain auth-info)
test.describe("WithAppDrawer", () => {
  test("should match screenshots", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("app-drawer-open-burger-button").click();
    await expect(page).toHaveScreenshot();
    const content = page.getByTestId("app-drawer-default-content");
    await expect(content).toHaveScreenshot();
  });
});

