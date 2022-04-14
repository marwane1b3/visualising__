/*
 *
 * CardManagerScreen actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_CARDS,
  GET_CARDS_ERROR,
  GET_CARDS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getCardsAction(data: any) {
  return {
    type: GET_CARDS,
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
