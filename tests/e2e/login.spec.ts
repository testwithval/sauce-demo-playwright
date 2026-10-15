import { users } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/test';

test('SD-LOGIN-01 valid login opens the catalog', async ({ loginPage, inventoryPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(inventoryPage.title).toHaveText('Products');
});

test('SD-LOGIN-02 locked-out user stays on the login page', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(users.locked.username, users.locked.password);

  await expect(loginPage.error).toContainText('locked out');
});
