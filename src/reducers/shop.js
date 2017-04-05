import I from 'immutable';
import uuid from 'uuid';
import { ActionTypes } from '../constants';
import { applyDiscounts } from '../discounts';

import { products, discounts } from '../data';


/**
 * Return state with update total based on discounts
 *
 * @param {any} state
 * @returns
 */
function updateTotal(state) {
  const { cart } = state;
  return state.merge(applyDiscounts(cart, products, discounts));
}


/**
 * Update the cart based on arbitrary function, automatically updating discounts
 *
 * @param {any} state
 * @param {any} fn
 * @returns
 */
function updateCart(state, fn) {
  return updateTotal(state.update('cart', fn));
}


/**
 * Update an item in the cart with new quantity, but possibly removing
 *
 * @param {any} cart
 * @param {any} cartId
 * @param {any} quantity
 * @returns
 */
function updateCartItem(cart, cartId, quantity) {
  if (quantity <= 0) {
    return cart.filter(({ cartId: cId }) => cId !== cartId);
  }
  return cart.map((item) => item.get('cartId') === cartId
    ? item.merge({
      quantity,
    })
    : item);
}


/**
 * Return a new cart item
 *
 * @param {any} id
 * @param {number} [quantity=1]
 * @returns
 */
function createCartItem(id, quantity = 1) {
  return I.Map({
    cartId: uuid(),
    id,
    quantity,
  });
}


/**
 * Add if not exists for this product, or update existing item
 *
 * @param {any} cart
 * @param {any} id
 * @param {any} quantity
 * @returns
 */
function addOrUpdateCartItem(cart, id, quantity) {
  const existingItems = cart.filter(({ id: itemId }) => id === itemId);
  if (existingItems.count() > 0) {
    const existingItem = existingItems.first();
    const { cartId, quantity: existingQuantity } = existingItem;
    return updateCartItem(cart, cartId, quantity + existingQuantity);
  }
  return cart.push(createCartItem(id, quantity));
}

export const initialState = I.fromJS({
  // Create an ID indexed map from the list of products.
  products,
  cart: [],
});

const mutations = {
  [ActionTypes.Shop.ADD_ITEM]: (state, { id, quantity }) => updateCart(
    state,
    cart => addOrUpdateCartItem(cart, id, quantity || 1),
  ),
  [ActionTypes.Shop.REMOVE_ITEM]: (state, action) => updateCart(
    state,
    cart => cart.filter(({ cartId }) => cartId !== action.cartId),
  ),
  [ActionTypes.Shop.UPDATE_ITEM_QUANTITY]: (state, { cartId, quantity }) => updateCart(
    state,
    cart => updateCartItem(cart, cartId, quantity),
  ),
};


/**
 * The shop reducer.
 *
 * @export
 * @param {any} state
 * @param {any} action
 * @returns
 */
export default function shop(state, action) {
  if (typeof state === 'undefined') return initialState;
  const nextState = (mutations[action.type] || (s => s))(state, action);
  return nextState;
}
