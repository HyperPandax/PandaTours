// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PandaTours/);
});

test('clicking through all the steps', async ({ page }) => {
  await page.goto('');

  const steptext = page.locator(".step-text");
  const nextButton = page.locator(".next-button");


  await expect(steptext).toHaveText("look! the overlay is automatically on the bottom because its on the top half of the screen");
  await nextButton.click();
  await expect(steptext).toHaveText("look! the overlay is is on the right and centered");
  await nextButton.click();

});

//test zie accurate text 
//test zie goede positie 
//tes klik next