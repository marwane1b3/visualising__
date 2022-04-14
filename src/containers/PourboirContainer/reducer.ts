/*
 *
 * PourboirContainer reducer
 *
 */

import produce from 'immer';
import {
  DEFAULT_ACTION,
  SET_TIP_ACTION,
  SET_TIP_ACTION_FAIL,
  SET_TIP_ACTION_SUCCESS,
  CHECK_KAALIX_LOYALTY_ACTION,
  CHECK_KAALIX_LOYALTY_ACTION_FAIL,
  CHECK_KAALIX_LOYALTY_ACTION_SUCCESS,
  GET_CARD_LIST,
  GET_CARD_LIST_FAIL,
  GET_CARD_LIST_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  body: {},
  response: '',
  kaalixLoyalty: 0,
  kaalixLoyaltyMsg: 0,
  money: 0,
  card: [],
  cardMsg: 0,
};

/* eslint-disable default-case, no-param-reassign */
const pourboirContainerReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_TIP_ACTION:
      draft.loading = true;
      draft.error = false;
      draft.body = action.body;
      break;

    case SET_TIP_ACTION_SUCCESS:
      draft.loading = false;
      draft.error = false;
      draft.response = action.response;
      break;
    case SET_TIP_ACTION_FAIL:
      draft.loading = false;
      draft.error = true;
      draft.response = action.response;
      break;
    case CHECK_KAALIX_LOYALTY_ACTION:
      draft.loading = false;
      draft.error = false;
      draft.kaalixLoyaltyMsg = 0;
      draft.money = action.money;
      break;
    case CHECK_KAALIX_LOYALTY_ACTION_SUCCESS:
      draft.loading = false;
      draft.error = false;
      draft.kaalixLoyaltyMsg = 1;
      draft.kaalixLoyalty = action.KaalixLoyalty;
      break;
    case CHECK_KAALIX_LOYALTY_ACTION_FAIL:
      draft.loading = false;
      draft.error = true;
      draft.kaalixLoyaltyMsg = action.msg;
      break;
    case GET_CARD_LIST:
      draft.loading = false;
      draft.error = false;
      draft.cardMsg = 0;
      break;
    case GET_CARD_LIST_SUCCESS:
      draft.loading = false;
      draft.error = false;
      draft.cardMsg = 1;
      draft.card = action.card;
      break;
    case GET_CARD_LIST_FAIL:
      draft.loading = false;
      draft.error = true;
      draft.cardMsg = action.cardMsg;

      break;
  }
}, initialState);

export default pourboirContainerReducer;
