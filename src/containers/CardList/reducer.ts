/*
 *
 * CardList reducer
 *
 */

import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_CARD_LIST,
  GET_CARDS_ERROR,
  GET_CARDS_SUCCESS,
  GET_URL_ADD_CARD,
  GET_URL_ADD_CARD_SUCCESS,
  SELECTED_CARD,
} from './constants';

export const initialState = {
  customerId: null,
  cardList: null,
  paymentDetail: null,
  loading: false,
  error: false,
  selectedCard: null,
  paymentUrl: null,
};

/* eslint-disable default-case, no-param-reassign */
const cardListReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_CARD_LIST:
      draft.cardList = null;
      draft.customerId = action.data.customerId;
      draft.loading = true;
      draft.error = false;
      break;
    case GET_CARDS_SUCCESS:
      draft.cardList = action.data;
      draft.selectedCard = action.data.find((c: any) => c.selected);
      draft.loading = false;
      draft.error = false;
      break;
    case GET_CARDS_ERROR:
      draft.cardList = null;
      draft.loading = false;
      draft.error = true;
      break;
    case GET_URL_ADD_CARD:
      draft.paymentUrl = null;
      break;
    case GET_URL_ADD_CARD_SUCCESS:
      draft.paymentUrl = action.data;
      break;
    case SELECTED_CARD:
      draft.cardList = action.data.cards;
      draft.selectedCard = action.data.selectedCard;
      break;
    case DEFAULT_ACTION:
      break;
  }
}, initialState);

export default cardListReducer;
