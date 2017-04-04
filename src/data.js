import I from 'immutable';

export const products = I.fromJS([
  {
    id: '5be7d36a-4f85-489c-82fb-5ceb99d57ecb',
    name: 'Potato',
  },
  {
    id: 'ff09a930-0bbe-4645-9064-b43e54bb941c',
  },
  {
    id: 'f886a422-0c24-4a19-ac89-fc5cb47f2043',
  },
  {
    id: '0e58ff5d-2226-4f16-8cfd-cf4af1885941',
  },
  {
    id: '341e0c8a-021e-4b5b-9e7c-d8fe452ac486',
  },
  {
    id: 'd2eef024-aa34-4181-ac7b-e0974e62266b',
  },
]);

export const discounts = I.fromJS([
  {
    type: 'product',
    productId: '5be7d36a-4f85-489c-82fb-5ceb99d57ecb',
    discountType: 'fixed',
  },
]);
