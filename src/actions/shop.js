import { ActionTypes } from '../constants';

export function addItem(itemId) {
  return {
    type: ActionTypes.Shop.ADD_ITEM,
    itemId,
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
    quantity,
  };
}
