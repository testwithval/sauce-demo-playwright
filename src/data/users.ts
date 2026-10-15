export type User = {
  username: string;
  password: string;
};

export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
} satisfies Record<string, User>;

export const products = {
  backpack: { name: 'Sauce Labs Backpack', price: 29.99 },
  bikeLight: { name: 'Sauce Labs Bike Light', price: 9.99 },
  boltShirt: { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  fleeceJacket: { name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  onesie: { name: 'Sauce Labs Onesie', price: 7.99 },
  redShirt: { name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 },
} as const;

export const customer = {
  firstName: 'Valentina',
  lastName: 'Nova',
  postalCode: '81101',
};
