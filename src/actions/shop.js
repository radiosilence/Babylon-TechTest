import { ActionTypes } from '../constants';

export function addItem(id, quantity) {
  return {
    type: ActionTypes.Shop.ADD_ITEM,
    id,
    quantity: parseInt(quantity, 10),
  };
}


export function removeItem(cartId) {
  return {
    type: ActionTypes.Shop.REMOVE_ITEM,
    cartId,
  };
}

export function updateItemQuantity(cartId, quantity) {
  return {
    type: ActionTypes.Shop.UPDATE_ITEM_QUANTITY,
    cartId,
    quantity: parseInt(quantity, 10),
  };
}
