import { products } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/test';

test('SD-CART-01 adding a product increases the cart badge', async ({ inventoryPage }) => {
  await inventoryPage.open();
  await inventoryPage.addToCart(products.backpack.name);

  await expect(inventoryPage.header.cartBadge).toHaveText('1');
});

test('SD-CART-02 adding two products and removing one updates the cart', async ({
  inventoryPage,
  cartPage,
}) => {
  await inventoryPage.open();
  await inventoryPage.addToCart(products.backpack.name);
  await inventoryPage.addToCart(products.bikeLight.name);

  await expect(inventoryPage.header.cartBadge).toHaveText('2');
  await inventoryPage.header.openCart();
  await expect(cartPage.itemNames).toHaveText([
    products.backpack.name,
    products.bikeLight.name,
  ]);

  await cartPage.remove(products.bikeLight.name);

  await expect(cartPage.itemNames).toHaveText([products.backpack.name]);
  await expect(cartPage.header.cartBadge).toHaveText('1');
});
