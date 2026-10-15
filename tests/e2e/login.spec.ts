import { users } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/test';

test('platné prihlásenie otvorí katalóg', async ({ loginPage, inventoryPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(inventoryPage.title).toHaveText('Products');
});

test('zablokovaný používateľ ostane na prihlásení', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(users.locked.username, users.locked.password);

  await expect(loginPage.error).toContainText('locked out');
});
