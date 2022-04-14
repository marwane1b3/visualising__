/*
 *
 * MycardsScreen reducer
 *
 */

import produce from 'immer';
import {
  DEFAULT_ACTION,
} from './constants';

export const initialState = {
  paymentUrl: null,
};

/* eslint-disable default-case, no-param-reassign */
const mycardsScreenReducer = produce((draft, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      break;
  }
}, initialState);

export default mycardsScreenReducer;
