import I from 'immutable';
// import ActionTypes from '../constants/actionTypes';

const initialState = I.fromJS({});

const mutations = {};


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
