import fs from 'node:fs';
import { expect, test as setup } from '@playwright/test';
import { users } from '../src/data/users';
import { LoginPage } from '../src/pages/LoginPage';

const authFile = '.auth/standard.json';

setup('prihlás standard_user a ulož session', async ({ page }) => {
  fs.mkdirSync('.auth', { recursive: true });

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/inventory\.html/);

  await page.context().storageState({ path: authFile });
});
