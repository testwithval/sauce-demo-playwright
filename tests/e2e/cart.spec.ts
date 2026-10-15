import { products } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/test';

test('pridanie do košíka zvýši počet na ikone', async ({ inventoryPage }) => {
  await inventoryPage.open();
  await inventoryPage.addToCart(products.backpack);

  await expect(inventoryPage.header.cartBadge).toHaveText('1');
});

test('zoradenie od Z po A dá na začiatok tričko', async ({ inventoryPage }) => {
  await inventoryPage.open();
  await inventoryPage.sortBy('za');

  await expect(inventoryPage.itemNames.first()).toHaveText(
    'Test.allTheThings() T-Shirt (Red)',
  );
});
