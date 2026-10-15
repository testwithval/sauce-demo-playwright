export type User = {
  username: string;
  password: string;
};

export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
} satisfies Record<string, User>;

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
} as const;

export const customer = {
  firstName: 'Valentina',
  lastName: 'Nova',
  postalCode: '81101',
};
