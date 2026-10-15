import { products } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/test';
import { formatUsd } from '../../src/helpers/money';

test('SD-PROD-01 backpack details add the item and the catalog shows the count', async ({
  inventoryPage,
  productPage,
}) => {
  await inventoryPage.open();
  await inventoryPage.openDetails(products.backpack.name);

  await expect(productPage.name).toHaveText(products.backpack.name);
  await expect(productPage.price).toHaveText(formatUsd(products.backpack.price));

  await productPage.addToCart();
  await expect(productPage.header.cartBadge).toHaveText('1');

  await productPage.backToProducts();
  await expect(inventoryPage.title).toHaveText('Products');
  await expect(inventoryPage.header.cartBadge).toHaveText('1');
});
