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
  test('should allow me to execute the order 67 without any problem', async ({ page }) => {
    // close cookies popup.
    await page.locator('xpath=//yt-formatted-string[.="Reject all"]').click();
    await page.locator('xpath=//tp-yt-paper-dialog').isHidden();

    // reload the page to avoid cookies animation
    await page.reload();

    // insert the string to search.
    await page.locator(SEARCH_LOCATOR).waitFor();
    await page.type(SEARCH_LOCATOR, SEARCH_ITEM[0]);
    await page.click('xpath=//button[@id="search-icon-legacy"]');
    await page.waitForTimeout(3000)

    // Make sure the title is properly filled.
    await expect(page).toHaveTitle('execute order 67 - YouTube');

    //open the first one
    await page.click('xpath=(//ytd-video-renderer//a[@id="thumbnail"])[1]');

    await logTheAmazingUrl(page);
  });
});

async function logTheAmazingUrl(page: Page) {
  const url = page.url();
  console.log(url);
}
