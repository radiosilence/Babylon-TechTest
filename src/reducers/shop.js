import I from 'immutable';
import uuid from 'uuid';
import { ActionTypes } from '../constants';
import { applyDiscounts } from '../discounts';

import { products } from '../data';

function updateTotal(state) {
  const { cart } = state;
  return state.merge(applyDiscounts(cart));
}

function updateCart(state, fn) {
  return updateTotal(state.update('cart', fn));
}

function createCartItem(id, quantity = 1) {
  return I.Map({
    cartId: uuid(),
    lineTotal: products.getIn([id, 'price']),
    id,
    quantity,
  });
}

export const initialState = I.fromJS({
  // Create an ID indexed map from the list of products.
  products,
  cart: [],
});

const mutations = {
  [ActionTypes.Shop.ADD_ITEM]: (state, { id, quantity }) => updateCart(
    state,
    cart => cart.push(createCartItem(id, quantity)),
  ),
  [ActionTypes.Shop.REMOVE_ITEM]: (state, action) => updateCart(
    state,
    cart => cart.filter(({ cartId }) => cartId !== action.cartId),
  ),
  [ActionTypes.Shop.UPDATE_ITEM_QUANTITY]: (state, action) => updateCart(
    state,
    cart => cart.map((item) => item.get('cartId') === action.cartId
      ? item.set('quantity', action.quantity)
      : item,
    ),
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
