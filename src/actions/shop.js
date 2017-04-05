import { ActionTypes } from '../constants';


/**
 * Add an item to cart
 *
 * @export
 * @param {any} id
 * @param {any} quantity
 * @returns
 */
export function addItem(id, quantity) {
  return {
    type: ActionTypes.Shop.ADD_ITEM,
    id,
    quantity: parseInt(quantity, 10),
  };
}


/**
 * Remove an item from cart
 *
 * @export
 * @param {any} cartId
 * @returns
 */
export function removeItem(cartId) {
  return {
    type: ActionTypes.Shop.REMOVE_ITEM,
    cartId,
  };
}


/**
 * Update the quantity of item in cart
 *
 * @export
 * @param {any} cartId
 * @param {any} quantity
 * @returns
 */
export function updateItemQuantity(cartId, quantity) {
  return {
    type: ActionTypes.Shop.UPDATE_ITEM_QUANTITY,
    cartId,
    quantity: parseInt(quantity, 10),
  };
}
