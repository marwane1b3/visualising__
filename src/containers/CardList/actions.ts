/*
 *
 * CardList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_CARD_LIST,
  GET_CARDS_ERROR,
  GET_CARDS_SUCCESS,
  GET_URL_ADD_CARD,
  GET_URL_ADD_CARD_ERROR,
  GET_URL_ADD_CARD_SUCCESS,
  SELECTED_CARD,
  SELECTED_CARD_ERROR,
  SELECTED_CARD_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getCardsAction(data: any) {
  return {
    type: GET_CARD_LIST,
    data,
  };
}
export function getCardsSuccessAction(data: any) {
  return {
    type: GET_CARDS_SUCCESS,
    data,
  };
}
export function getCardsErrorAction(data: any) {
  return {
    type: GET_CARDS_ERROR,
    data,
  };
}

export function selectedCardAction(data: any) {
  return {
    type: SELECTED_CARD,
    data,
  };
}
export function selectedCardSuccessAction(data: any) {
  return {
    type: SELECTED_CARD_SUCCESS,
    data,
  };
}
export function selectedCardErrorAction(error: any) {
  return {
    type: SELECTED_CARD_ERROR,
    error,
  };
}

export function getUrlAddCardAction(data: any) {
  console.log('getUrlAddCardAction',data)
  return {
    type: GET_URL_ADD_CARD,
    data,
  };
}
export function getUrlAddCardSuccessAction(data: any) {
  return {
    type: GET_URL_ADD_CARD_SUCCESS,
    data,
  };
}
export function getUrlAddCardErrorAction(error: any) {
  return {
    type: GET_URL_ADD_CARD_ERROR,
    error,
  };
}
