import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://youtube.com');
});

const SEARCH_ITEM = [
  'execute order 67'
];

const SEARCH_LOCATOR = 
  'xpath=//input[@id="search"]'
;

test.describe('Execute Order 67', () => {
  test('should allow me to search order 67 without any problem', async ({ page }) => {
    // close cookies popup.
    await page.locator('xpath=//yt-formatted-string[.="Reject all"]').click();
    await page.locator('xpath=//tp-yt-paper-dialog').isHidden()

    // reload the page to avoid cookies animation
    await page.reload()

    // insert the string to search.
    await page.locator(SEARCH_LOCATOR).fill(SEARCH_ITEM[0]);
    await page.locator("xpath=//button[@id='search-icon-legacy']").click();

    // Make sure the search input is filled.
    await expect(page.locator(SEARCH_LOCATOR)).toHaveText([
      SEARCH_ITEM[0]
    ]);

    await clickFirstResultInPage(page);
  });
});

async function clickFirstResultInPage(page: Page) {
    await page.locator('xpath=(//ytd-video-renderer//a[@id="thumbnail"])[0]').click();
}
