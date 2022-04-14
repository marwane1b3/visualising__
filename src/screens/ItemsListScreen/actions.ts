/*
 *
 * ItemsListScreen actions
 *
 */

import {
  FULL_LIST,
  GET_LIST_ITEMS,
  GET_LIST_ITEMS_FAIL,
  REQUEST_LIST_ITEMS,
  SELECT_ID,
  GET_LIST_PRODUCTS,
  TESTING_INDEX_INDICATOR_ACTION,
  //
  GET_PRODUCTS_ACTION,
  GET_PRODUCTS_ERROR_ACTION,
  GET_PRODUCTS_SUCCESS_ACTION,
} from './constants';

export function getProductsAction(){
  return {
    type: GET_PRODUCTS_ACTION,
  };
} 

export function getProductsSuccessAction(productCategories: any){
  return {
    type: GET_PRODUCTS_SUCCESS_ACTION,
    productCategories
  };
}

export function getProductsErrorAction(error: any) {
  return {
    type: GET_PRODUCTS_ERROR_ACTION,
    error,
  };
}

export function getFullList(list: []) {
  return {
    type: FULL_LIST,
    list,
  };
}
export function requestListItems() {
  return {
    type: REQUEST_LIST_ITEMS,
  };
}

export function getListItems(items: []) {
  return {
    type: GET_LIST_ITEMS,
    items,
  };
}
export function getProductsList(products: []) {
  return {
    type: GET_LIST_PRODUCTS,
    products,
  };
}

export function getId(id: any) {
  return {
    type: SELECT_ID,
    id,
  };
}

export function getListItemsFail(err: any) {
  return {
    type: GET_LIST_ITEMS_FAIL,
    err,
  };
}

export function indexTesting(index: number) {
  return {
    type: TESTING_INDEX_INDICATOR_ACTION,
    index,
  };
}
