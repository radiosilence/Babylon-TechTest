import I from 'immutable';
import Decimal from 'decimal.js';
import { discounts } from './data';

function applyDiscount(lineItem, discount) {
  const { discountType, value } = discount;
  const { lineTotal } = lineItem;

  const op = discountType === 'fixed' ? 'add' : 'mul';

  return lineItem.set(
    'lineTotal',
    Decimal[op](lineTotal, value),
  );
}


function applyLineDiscount(item) {
  const { id } = item;
  return discounts
    .filter(({ type }) => type === 'product')
    .filter(({ productId }) => productId === id)
    .reduce(
      (nextItem, discount) => applyDiscount(nextItem, discount),
      item,
    );
}

function applyLineDiscounts(cart) {
  return cart
    .map(applyLineDiscount);
}

// TODO
function applicableToCart(cart, discount) {
  return true;
}

// TODO
function applyOrderDiscount(total, discount) {
  return total;
}

function applyOrderDiscounts(cart, total) {
  return discounts
    .filter(({ type }) => type === 'order')
    .filter(discount => applicableToCart(cart, discount))
    .reduce(
      (nextTotal, discount) => applyOrderDiscount(nextTotal, discount),
      total,
    );
}

export function applyDiscounts(cart) {
  const nextCart = applyLineDiscounts(cart);
  const total = nextCart.reduce(
    (acc, { lineTotal }) => Decimal.add(lineTotal, acc),
    new Decimal(0),
  );

  const nextTotal = applyOrderDiscounts(nextCart, total);

  return I.Map({
    cart: nextCart,
    total: nextTotal,
  });
}
