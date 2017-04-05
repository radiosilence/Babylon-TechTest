import I from 'immutable';
import Decimal from 'decimal.js';
import { products, discounts } from './data';


/**
 * Apply a discount to a line, based on the type of discount
 *
 * @param {any} lineItem
 * @param {any} discount
 * @returns
 */
function applyDiscount(lineItem, discount) {
  const { discountType, value } = discount;
  const { lineTotal, quantity } = lineItem;

  const op = discountType === 'fixed' ? 'add' : 'mul';
  const multiplier = discountType === 'fixed' ? quantity : 1; // Shortcut/hack, tbh.

  return lineItem.set(
    'lineTotal',
    Decimal[op](lineTotal, value * multiplier),
  );
}


/**
 * Return a line item with it's discount applied
 *
 * @param {any} item
 * @returns
 */
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


/**
 * Apply all the product discounts to a line row
 *
 * @param {any} cart
 * @returns
 */
function applyLineDiscounts(cart) {
  return cart
    .map(applyLineDiscount);
}


/**
 * Find whether an order discount applies to the cart
 *
 * @param {any} cart
 * @param {any} discount
 * @returns
 */
function applicableToCart(cart, discount) {
  const inCartIds = cart.map(({ id }) => id);

  const { itemsPresent } = discount;
  return itemsPresent
    .reduce(
      (dst, productId) => dst && inCartIds.includes(productId),
      true,
    );
}



/**
 * Apply a single cart total order discount
 *
 * @param {any} total
 * @param {any} discount
 * @returns
 */
function applyOrderDiscount(total, discount) {
  const { discountType, value } = discount;
  const op = discountType === 'fixed' ? 'add' : 'mul';
  return Decimal[op](total, value);
}


/**
 * Apply discounts to cart total based on discounts that apply to that
 *
 * @param {any} cart
 * @param {any} total
 * @returns
 */
function applyOrderDiscounts(cart, total) {
  return discounts
    .filter(({ type }) => type === 'order')
    .filter(discount => applicableToCart(cart, discount))
    .reduce(
      (nextTotal, discount) => applyOrderDiscount(nextTotal, discount),
      total,
    );
}


/**
 * Get the totals based on quantity and base item price, pre-discount
 *
 * @export
 * @param {any} cart
 * @returns
 */
export function baseLineTotals(cart) {
  // console.log('doing baseLineTotals of cart', cart);
  return cart
    .map(item => item.set('lineTotal', products.getIn([item.get('id'), 'price']) * item.get('quantity')));
}


/**
 * Main function for processing cart and applying discounts
 *
 * @export
 * @param {any} cart
 * @returns
 */
export function applyDiscounts(cart) {
  // console.log('applyin discounts of cart', cart);
  const nextCart = applyLineDiscounts(baseLineTotals(cart));
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
