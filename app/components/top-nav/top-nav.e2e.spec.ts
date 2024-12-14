import { test, expect } from "@playwright/test";
import screens from "../../../tailwind.screens";

test.describe("TopNav", () => {
  test("mobile-like screen", async ({ page }) => {
    await page.goto("/");
    await page.setViewportSize({
      width: parseInt(screens["xxs"], 10),
      height: 568,
    });
    await expect(page.getByTestId("top-nav")).toHaveScreenshot();
  });

  test("tablet-like screen", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("top-nav")).toHaveScreenshot();
  });
});
