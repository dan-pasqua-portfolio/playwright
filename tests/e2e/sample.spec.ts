import { test } from '../../src/fixtures/pages.fixture';

test('sample test', async ({ page, log }) => {
  await log.step('Navigate to Playwright website', async () => {
    await page.goto('https://playwright.dev/');
  });

  await log.step('Add second step to verify step logger', async () => {
    console.log('Passed');
  });
});
