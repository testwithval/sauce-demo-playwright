import { products } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/test';

test('SD-SES-01 logout returns to the login page and blocks the catalog', async ({ inventoryPage, menu, loginPage, page }) => {
  await inventoryPage.open();
  await menu.logOut();

  await expect(page).toHaveURL('/');
  await expect(loginPage.username).toBeVisible();

  await page.goto('/inventory.html');

  await expect(page).toHaveURL('/');
  await expect(loginPage.username).toBeVisible();
});

test('SD-SES-02 resetting the app state clears the cart', async ({ inventoryPage, menu, cartPage }) => {
  await inventoryPage.open();
  await inventoryPage.addToCart(products.backpack.name);
  await inventoryPage.addToCart(products.bikeLight.name);
  await expect(inventoryPage.header.cartBadge).toHaveText('2');

  await menu.resetAppState();

  await expect(inventoryPage.header.cartBadge).toBeHidden();
  await inventoryPage.header.openCart();
  await expect(cartPage.itemNames).toHaveCount(0);
});
