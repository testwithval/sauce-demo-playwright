import { products } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/test';
import { pricesHighToLow, pricesLowToHigh } from '../../src/helpers/money';

test('SD-CAT-01 price sort from low to high follows the catalog prices', async ({ inventoryPage }) => {
  await inventoryPage.open();
  await inventoryPage.sortBy('lohi');

  await expect(inventoryPage.itemNames.first()).toHaveText(products.onesie.name);
  await expect(inventoryPage.prices).toHaveText(pricesLowToHigh());
});

test('SD-CAT-02 price sort from high to low starts with the fleece jacket', async ({ inventoryPage }) => {
  await inventoryPage.open();
  await inventoryPage.sortBy('hilo');

  await expect(inventoryPage.itemNames.first()).toHaveText(products.fleeceJacket.name);
  await expect(inventoryPage.prices).toHaveText(pricesHighToLow());
});

test('SD-CAT-03 name sort from Z to A puts the red shirt first', async ({ inventoryPage }) => {
  await inventoryPage.open();
  await inventoryPage.sortBy('za');

  await expect(inventoryPage.itemNames.first()).toHaveText(products.redShirt.name);
});
