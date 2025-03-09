import { test, expect } from "@playwright/test";
import {
  createAuthenticatedRootPage,
  createGameLobby,
  expectJoinLobbyButtonsCount,
  getEnterLobbyButton,
  getStartGameButton,
} from "@@/e2e/utils/from-root-page-to-game-page";

test("2 players game can be created", async ({
  context,
  browser,
  browserName,
}) => {
  if (browserName === "webkit") {
    // webkit prevents session cookie save - can not make authentication
    // https://github.com/microsoft/playwright/issues/17368
    // when will be closes that should add flag to allow cookie
    return test.skip();
  }
  const lobbyAdminPage = await createAuthenticatedRootPage(context);
  await createGameLobby(lobbyAdminPage);

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
