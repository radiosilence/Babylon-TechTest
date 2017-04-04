import { expect } from 'chai';
import { ActionTypes } from '../../src/constants';

import shopReducer, {
  initialState,
} from '../../src/reducers/shop';

function addedItem(state) {
  return shopReducer(state, {
    type: ActionTypes.Shop.ADD_ITEM,
    id: '5be7d36a-4f85-489c-82fb-5ceb99d57ecb',
  });
}

describe('shop reducer', () => {
  it('should add an item to the cart', () => {
    const nextState = addedItem(initialState);
    const item = nextState.getIn(['cart', 0]);
    const { id, quantity, cartId } = item;
    expect(id).to.equal('5be7d36a-4f85-489c-82fb-5ceb99d57ecb');
    expect(quantity).to.equal(1);
    expect(cartId).to.not.equal(undefined);
  });

  it('should remove an item from the cart', () => {
    let state = addedItem(initialState);
    const item = state.getIn(['cart', 0]);
    const { cartId } = item;
    state = shopReducer(state, {
      type: ActionTypes.Shop.REMOVE_ITEM,
      cartId,
    });
    const { cart } = state;
    expect(cart.count()).to.equal(0);
  });

  it('should update the quantity of a cart item from 1 to 2', () => {
    let state = addedItem(initialState);
    let item = state.getIn(['cart', 0]);
    const { cartId } = item;
    state = shopReducer(state, {
      type: ActionTypes.Shop.UPDATE_ITEM_QUANTITY,
      cartId,
      quantity: 2,
    });
    item = state.getIn(['cart', 0]);
    const { quantity } = item;
    expect(quantity).to.equal(2);
  });
});
