/*
 *
 * ShoppingCardScreen reducer
 *
 */

import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const shoppingCardScreenReducer = produce((draft, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      break;
  }
}, initialState);

export default shoppingCardScreenReducer;
