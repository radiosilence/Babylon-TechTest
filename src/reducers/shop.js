import I from 'immutable';
import { ActionTypes } from '../constants';

const initialState = I.fromJS({
  cart: [],
});

const mutations = {
  [ActionTypes.ADD_ITEM]: (state) => state,
  [ActionTypes.REMOVE_ITEM]: (state) => state,
  [ActionTypes.UPDATE_ITEM_QUANTITY]: (state) => state,
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
