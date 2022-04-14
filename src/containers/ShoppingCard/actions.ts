/*
 *
 * ShoppingCard actions
 *
 */

import {
  ADD_ITEM,
  PLUS_QUANTITY,
  MINUS_QUANTITY,
  REHYDRATE_STORE,
  CLEAR_CARD,
  SET_SELECTED_STORE,
} from './constants';

export function addItemAction(itemToAdd: object, item: object, product: object) {
  return {
    type: ADD_ITEM,
    itemToAdd,
    item,
    product,
  };
}
export function plusItemQuantity(item: object, productId: string) {
  return {
    type: PLUS_QUANTITY,
    item,
    productId,
  };
}
export function minusItemQuantity(item: object, productId: string) {
  return {
    type: MINUS_QUANTITY,
    item,
    productId,
  };
}
export function clearCardAction(item: object) {
  return {
    type: CLEAR_CARD,
    item,
  };
}

export function rehydrateStoreAction(store: any) {
  return {
    type: REHYDRATE_STORE,
    store,
  };
}

export function setSelectedStoreAction(store: any) {
  return {
    type: SET_SELECTED_STORE,
    store,
  };
}

