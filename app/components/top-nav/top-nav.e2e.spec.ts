import { test, expect } from "@playwright/test";
import screens from "../../../tailwind.screens";

test.describe("TopNav", () => {
  const mobileHeight = 568; /* can be other number */
  const mobileWidth = parseInt(screens["xxs"], 10);

  test("mobile-like screen", async ({ page }) => {
    await page.goto("/");
    await page.setViewportSize({
      width: mobileWidth,
      height: mobileHeight,
    });
    await expect(page.getByTestId("top-nav")).toHaveScreenshot();
  });

  const biggerMobileWidth = mobileWidth + 20;

  test("bigger mobile-like screen", async ({ page }) => {
    await page.goto("/");
    await page.setViewportSize({
      width: biggerMobileWidth,
      height: mobileHeight,
    });
    await expect(page.getByTestId("top-nav")).toHaveScreenshot();
  });

  test("tablet-like screen", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("top-nav")).toHaveScreenshot();
  });
});
