import { customer, products } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/test';

test('nákup batohu skončí poďakovaním', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await inventoryPage.open();
  await inventoryPage.addToCart(products.backpack);
  await inventoryPage.header.openCart();

  await expect(cartPage.itemNames).toHaveText([products.backpack]);
  await cartPage.openCheckout();

  await checkoutPage.fillCustomer(customer);
  await checkoutPage.confirm();

  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});
