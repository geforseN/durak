import { type Page } from "@playwright/test";

export default async function isMobilePage(page: Page) {
  const appThemeSelectLocator = page.locator(
    '[data-testid="top-nav"] > [data-testid="app-theme-select"]',
  );
  return await appThemeSelectLocator.isHidden();
}
