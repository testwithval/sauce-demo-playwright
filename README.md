# Sauce Demo Playwright

Cvičný framework v Playwright a TypeScripte proti [Sauce Demo](https://www.saucedemo.com).

## Spustenie

```bash
npm install
npx playwright install chromium
npm test
```

Viditeľný prehliadač: `npm run test:headed`. Krokový pohľad: `npm run test:ui`.

## Ako sú testy poskladané

- `playwright.config.ts` rozdeľuje beh na tri projects. `guest` testuje prihlásenie bez session. `setup` sa prihlási raz a session uloží. `shop` potom spúšťa košík a nákup už prihlásený.
- `src/pages` a `src/components` držia lokátory a akcie stránok.
- `src/fixtures/test.ts` tie stránky pripraví a test ich dostane ako argument.
- `src/data/users.ts` drží účty, produkty a údaje zákazníka.
- `tests/e2e` sú samotné scenáre.
