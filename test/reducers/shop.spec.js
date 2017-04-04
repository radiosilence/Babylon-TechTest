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
    const state = addedItem(initialState);
    const item = state.getIn(['cart', 0]);
    const { cartId } = item;
    const nextState = shopReducer(state, {
      type: ActionTypes.Shop.REMOVE_ITEM,
      cartId,
    });
    const { cart } = nextState;
    expect(cart.count()).to.equal(0);
  });
});
