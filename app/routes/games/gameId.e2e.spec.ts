import { test, expect, type Page, type BrowserContext } from "@playwright/test";

const getButton = (page: Page, name: string | RegExp) =>
  page.getByRole("button", { name });

const createAuthenticatedRootPage = async (context: BrowserContext) => {
  const page = await context.newPage();
  await page.goto("/");
  await getButton(page, /Create Anonymous Account/i).click();
  await page.goto("/");
  return page;
};

/** `Create Game` button opens modal where user can set game setting and create game lobby */
const getCreateGameButton = (page: Page) => getButton(page, /Create Game/i);

/** `Create Lobby` button exist in modal and after click it will add game lobby where other user can connect via `Enter the Lobby` button */
const getCreateLobbyButton = (page: Page) => getButton(page, /Create Lobby/i);

/** `Enter the Lobby` button on click will make game lobby empty slot filled with user that clicked the button */
const getEnterLobbyButton = (page: Page) => getButton(page, /Enter the Lobby/i);

/** `Start the Game` button is visible only for lobby admin and when all slots are filled. on click all lobby users must be redirected to the game page */
const getStartGameButton = (page: Page) => getButton(page, /Start the Game/i);

const expectJoinLobbyButtonsCount = async (
  count: number,
  pages: readonly Page[],
) => {
  for (const page of pages) {
    await expect(getEnterLobbyButton(page)).toHaveCount(count);
  }
};

test("2 players game can be created", async ({ context, browser }) => {
  const lobbyAdminPage = await createAuthenticatedRootPage(context);
  // must add timeout because this button lazy loaded component
  await getCreateGameButton(lobbyAdminPage).click({ timeout: 1000 });
  await getCreateLobbyButton(lobbyAdminPage).click();

  const otherContext = await browser.newContext();
  const otherPlayerPage = await createAuthenticatedRootPage(otherContext);
  const pages = [lobbyAdminPage, otherPlayerPage] as const;

  await expectJoinLobbyButtonsCount(1, pages);
  await getEnterLobbyButton(otherPlayerPage).click();
  await expectJoinLobbyButtonsCount(0, pages);

  await expect(getStartGameButton(otherPlayerPage)).toHaveCount(0);
  await getStartGameButton(lobbyAdminPage).click();

  for (const page of pages) {
    await expect(page).toHaveScreenshot({
      mask: [
        //
        page.getByTestId("user-avatar"),
        page.getByLabel("game-card"),
      ],
    });
  }
  await Promise.all([context.close(), otherContext.close()]);
  await browser.close();
});
