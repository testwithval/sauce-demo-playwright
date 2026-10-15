# Sauce Demo Playwright

A practice framework in Playwright and TypeScript against [Sauce Demo](https://www.saucedemo.com).

## Run

```bash
npm install
npx playwright install chromium
npm test
```

Visible browser: `npm run test:headed`. Step-through view: `npm run test:ui`.

## How the tests are put together

- `playwright.config.ts` splits the run into three projects. `guest` tests login without a session. `setup` signs in once and saves that session. `shop` then runs every other scenario already signed in.
- `src/pages` and `src/components` hold the locators and actions for each screen.
- `src/fixtures/test.ts` builds those screens and passes them into a test as arguments.
- `src/data/users.ts` holds accounts, products, and customer details. `src/helpers/money.ts` turns the prices into the item total, tax, and total shown on the overview.
- `tests/e2e` holds the scenarios. Each title starts with an area id, such as `SD-LOGIN-01` or `SD-CART-02`. The number restarts inside the area.
