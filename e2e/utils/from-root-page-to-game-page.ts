import { expect, type Page, type BrowserContext } from "@playwright/test";
import isMobilePage from "./is-mobile-page";

const getButton = (page: Page, name: string | RegExp) =>
  page.getByRole("button", { name });

const getCreateAnonymousAccountButton = (page: Page) =>
  getButton(page, /Create Anonymous Account/i);

/** `Create Lobby` button exist in modal and after click it will add game lobby where other user can connect via `Enter the Lobby` button */
const getCreateLobbyButton = (page: Page) => getButton(page, /Create Lobby/i);

/** `Enter the Lobby` button on click will make game lobby empty slot filled with user that clicked the button */
export const getEnterLobbyButton = (page: Page) =>
  getButton(page, /Enter the Lobby/i);

/** `Start the Game` button is visible only for lobby admin and when all slots are filled. on click all lobby users must be redirected to the game page */
export const getStartGameButton = (page: Page) =>
  getButton(page, /Start the Game/i);

export const createAuthenticatedRootPage = async (context: BrowserContext) => {
  const page = await context.newPage();
  await page.goto("/");
  const authButtonLocator = getCreateAnonymousAccountButton(page);
  await authButtonLocator.click();
  await page.waitForURL("/");
  expect(authButtonLocator).toHaveCount(0);
  return page;
};

export const expectJoinLobbyButtonsCount = async (
  count: number,
  pages: readonly Page[],
) => {
  for (const page of pages) {
    await expect(getEnterLobbyButton(page)).toHaveCount(count);
  }
};

export async function createGameLobby(page: Page) {
  const isMobile = await isMobilePage(page);
  if (isMobile) {
    await page.getByLabel("open sidebar").click();
  }
  await getButton(page, /Create Game/i)
    .first()
    .click();
  await getCreateLobbyButton(page).first().click();
  if (isMobile) {
    await page.getByTestId("app-drawer-close-button").click();
  }
}
