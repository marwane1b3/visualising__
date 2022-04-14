/*
 *
 * PourboirContainer actions
 *
 */

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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function setTipAction(body: any) {
  return {
    type: SET_TIP_ACTION,
    body,
  };
}

export function setTipActionSuccess(response: any) {
  return {
    type: SET_TIP_ACTION_SUCCESS,
    response,
  };
}

export function setTipActionFail(error: any) {
  return {
    type: SET_TIP_ACTION_FAIL,
    error,
  };
}
export function checkKaalixLoyatyAction(money: number) {
  return {
    type: CHECK_KAALIX_LOYALTY_ACTION,
    money,
  };
}

export function checkKaalixLoyatySuccessAction(KaalixLoyalty: number) {
  return {
    type: CHECK_KAALIX_LOYALTY_ACTION_SUCCESS,
    KaalixLoyalty,
  };
}
export function checkKaalixLoyaltyFailAction(msg: number) {
  return {
    type: CHECK_KAALIX_LOYALTY_ACTION_FAIL,
    msg,
  };
}
/////////// card List functions

export function getCardListAction() {
  return {
    type: GET_CARD_LIST,
  };
}

export function getCartLisSuccessAction(card: any) {
  return {
    type: GET_CARD_LIST_SUCCESS,
    card,
  };
}
export function getCardListFailAction(cardMsg: number) {
  return {
    type: GET_CARD_LIST_FAIL,
    cardMsg,
  };
}
