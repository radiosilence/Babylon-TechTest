import I from 'immutable';
import Decimal from 'decimal.js';

export const listProducts = I.fromJS([
  {
    id: '5be7d36a-4f85-489c-82fb-5ceb99d57ecb',
    name: 'Portal Gun',
    price: new Decimal(300),
  },
  {
    id: 'ff09a930-0bbe-4645-9064-b43e54bb941c',
    name: 'Curse Removing Stone',
    price: new Decimal(500),
  },
  {
    id: 'f886a422-0c24-4a19-ac89-fc5cb47f2043',
    name: 'Beer',
    price: new Decimal(5.2),
  },
]);

// This would be on return of AJAX call, doing it here because why not.
export const products = listProducts
  .reduce(
    (dst, product) => dst.set(product.get('id'), product),
    I.Map(),
);

export const discounts = I.fromJS([
  {
    type: 'product',
    productId: '5be7d36a-4f85-489c-82fb-5ceb99d57ecb',
    discountType: 'fixed',
    value: new Decimal(-5),
  },
  {
    type: 'product',
    productId: 'ff09a930-0bbe-4645-9064-b43e54bb941c',
    discountType: 'percent',
    value: new Decimal(0.25),
  },
  {
    // 50% off if you order it with beer
    type: 'order',
    itemsPresent: ['f886a422-0c24-4a19-ac89-fc5cb47f2043'],
    discountType: 'percent',
    value: new Decimal(0.5),
  },
]);
