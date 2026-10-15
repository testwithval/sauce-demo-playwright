import { customer, products } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/test';
import { summarize } from '../../src/helpers/money';

test('SD-CHK-01 buying a backpack ends with a thank-you message', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await inventoryPage.open();
  await inventoryPage.addToCart(products.backpack.name);
  await inventoryPage.header.openCart();

  await expect(cartPage.itemNames).toHaveText([products.backpack.name]);
  await cartPage.openCheckout();

  await checkoutPage.fillCustomer(customer);
  await checkoutPage.confirm();

  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});

test('SD-CHK-02 after removing the bike light the overview charges the backpack and the onesie', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await inventoryPage.open();
  await inventoryPage.addToCart(products.backpack.name);
  await inventoryPage.addToCart(products.bikeLight.name);
  await inventoryPage.addToCart(products.onesie.name);
  await inventoryPage.header.openCart();
  await cartPage.remove(products.bikeLight.name);
  await cartPage.openCheckout();
  await checkoutPage.fillCustomer(customer);

  const kept = [products.backpack, products.onesie];
  const summary = summarize(kept);

  await expect(checkoutPage.itemNames).toHaveText(kept.map((item) => item.name));
  await expect(checkoutPage.itemTotal).toHaveText(summary.itemTotal);
  await expect(checkoutPage.tax).toHaveText(summary.tax);
  await expect(checkoutPage.total).toHaveText(summary.total);
});

test('SD-CHK-03 checkout without customer details stops on each required field', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await inventoryPage.open();
  await inventoryPage.addToCart(products.backpack.name);
  await inventoryPage.header.openCart();
  await cartPage.openCheckout();

  await checkoutPage.continue();
  await expect(checkoutPage.error).toContainText('First Name is required');

  await checkoutPage.firstName.fill(customer.firstName);
  await checkoutPage.continue();
  await expect(checkoutPage.error).toContainText('Last Name is required');

  await checkoutPage.lastName.fill(customer.lastName);
  await checkoutPage.continue();
  await expect(checkoutPage.error).toContainText('Postal Code is required');
});

test('SD-CHK-04 cancelling checkout leaves the item in the cart', async ({
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await inventoryPage.open();
  await inventoryPage.addToCart(products.fleeceJacket.name);
  await inventoryPage.header.openCart();
  await cartPage.openCheckout();
  await checkoutPage.cancel();

  await expect(cartPage.itemNames).toHaveText([products.fleeceJacket.name]);
  await expect(cartPage.header.cartBadge).toHaveText('1');
});
