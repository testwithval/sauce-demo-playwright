import { rejectedPassword, users } from '../../src/data/users';
import { expect, test } from '../../src/fixtures/test';

test('SD-LOGIN-01 valid login opens the catalog', async ({ loginPage, inventoryPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(inventoryPage.title).toHaveText('Products');
});

test('SD-LOGIN-02 missing credentials stop on the required field', async ({ loginPage, page }) => {
  await loginPage.open();

  await loginPage.login('', '');
  await expect(page).toHaveURL('/');
  await expect(loginPage.error).toContainText('Username is required');

  await loginPage.login(users.standard.username, '');
  await expect(loginPage.error).toContainText('Password is required');

  await loginPage.login('', users.standard.password);
  await expect(loginPage.error).toContainText('Username is required');
});

test('SD-LOGIN-03 locked-out user stays on the login page', async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.login(users.locked.username, users.locked.password);

  await expect(page).toHaveURL('/');
  await expect(loginPage.error).toContainText('locked out');
});

test('SD-LOGIN-04 wrong password stays on the login page', async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, rejectedPassword);

  await expect(page).toHaveURL('/');
  await expect(loginPage.error).toContainText('do not match any user');
});

test('SD-LOGIN-05 unknown username stays on the login page', async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.login(users.unknown.username, users.unknown.password);

  await expect(page).toHaveURL('/');
  await expect(loginPage.error).toContainText('do not match any user');
});
