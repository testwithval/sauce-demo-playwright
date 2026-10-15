import { products } from '../data/users';

type Priced = { price: number };

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// Sauce Demo počíta daň ako 8 % zo súčtu a texty skladá cez toFixed, bez predchádzajúceho zaokrúhlenia.
export function summarize(items: Priced[]) {
  const itemTotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = itemTotal * 0.08;

  return {
    itemTotal: `Item total: ${formatUsd(itemTotal)}`,
    tax: `Tax: ${formatUsd(tax)}`,
    total: `Total: ${formatUsd(itemTotal + tax)}`,
  };
}

export function pricesLowToHigh(): string[] {
  return Object.values(products)
    .map((product) => product.price)
    .sort((left, right) => left - right)
    .map(formatUsd);
}

export function pricesHighToLow(): string[] {
  return pricesLowToHigh().slice().reverse();
}
