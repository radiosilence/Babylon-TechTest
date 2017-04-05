import Decimal from 'decimal.js';
import { expect } from 'chai';
import { ActionTypes } from '../../src/constants';

import shopReducer, {
  initialState,
} from '../../src/reducers/shop';

const beer = {
  type: ActionTypes.Shop.ADD_ITEM,
  id: 'f886a422-0c24-4a19-ac89-fc5cb47f2043',
};

function addedItem(state) {
  return shopReducer(state, {
    type: ActionTypes.Shop.ADD_ITEM,
    id: '5be7d36a-4f85-489c-82fb-5ceb99d57ecb',
  });
}

describe('shop reducer', () => {
  it('should add an item to the cart', () => {
    const state = addedItem(initialState);
    const item = state.getIn(['cart', 0]);
    const { id, quantity, cartId } = item;
    const { cart } = state;
    expect(id).to.equal('5be7d36a-4f85-489c-82fb-5ceb99d57ecb');
    expect(quantity).to.equal(1);
    expect(cartId).to.not.equal(undefined);
    expect(cart.count()).to.equal(1);
  });

  it('should add an item to the cart twice and have it increment as opposed to adding a new cart item', () => {
    const state = addedItem(addedItem(initialState));
    const item = state.getIn(['cart', 0]);
    const { id, quantity } = item;
    const { cart } = state;
    expect(id).to.equal('5be7d36a-4f85-489c-82fb-5ceb99d57ecb');
    expect(quantity).to.equal(2);
    expect(cart.count()).to.equal(1);
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

  // Test that the price of portal gun has a fiver knocked off of it
  it('should add an item to the cart and it should have a fiver off of it', () => {
    const nextState = addedItem(initialState);
    const item = nextState.getIn(['cart', 0]);
    const { lineTotal } = item;
    expect(lineTotal.eq(new Decimal(295))).to.equal(true);
  });

  // Test that the price of portal gun has a fiver knocked off of it
  it('should add an item to the cart and it should have a fiver off of it and also the entire orer be halved because beer is involved', () => {
    let state = addedItem(initialState);
    state = shopReducer(state, beer);

    const desiredTotal = new Decimal(150.1);
    expect(state.get('total').eq(desiredTotal)).to.equal(true);
  });

  // Test that the price of portal gun has a fiver knocked off of it
  it('should add an item TWICE to the cart and it should have a fiver off of it and also the entire orer be halved because beer is involved', () => {
    let state = addedItem(addedItem(initialState));
    state = shopReducer(state, beer);
    const desiredTotal = new Decimal(297.6);
    expect(state.get('total').eq(desiredTotal)).to.equal(true);
  });
});
