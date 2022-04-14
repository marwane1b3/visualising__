/*
 *
 * ItemsListScreen reducer
 *
 */

import produce from 'immer';
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

export const initialState = {
  id: '',
  items: [],
  loading: false,
  error: false,
  products: [],
  fullList: [],
  index: 0,
  //
  productCategories: [],
  productCategoriesLoading: false,
  productCategoriesError: false,
};

/* eslint-disable default-case, no-param-reassign */
const itemsListScreenReducer = produce((draft, action) => {
  switch (action.type) {
    case SELECT_ID:
      draft.id = action.id;
      break;
    case REQUEST_LIST_ITEMS:
      draft.loading = true;
      draft.error = false;
      break;
    case FULL_LIST:
      draft.loading = false;
      draft.error = false;
      draft.fullList = action.list;
      break;
    case GET_LIST_ITEMS:
      draft.loading = false;
      draft.error = false;
      draft.items = action.items;
      break;
    case GET_LIST_PRODUCTS:
      draft.loading = false;
      draft.error = false;
      draft.products = action.products;
      break;
    case TESTING_INDEX_INDICATOR_ACTION:
      draft.index = action.index;
      break;
    case GET_LIST_ITEMS_FAIL:
      draft.loading = false;
      draft.error = action.err;
      break;

    //
    case GET_PRODUCTS_ACTION:
      console.log({ action });
      draft.productCategories = [];
      draft.productCategoriesError = null;
      draft.productCategoriesLoading = true;
    case GET_PRODUCTS_SUCCESS_ACTION:
      console.log({action})
      draft.productCategories = action.productCategories;
      draft.productCategoriesError = null;
      draft.productCategoriesLoading = false;
    case GET_PRODUCTS_ERROR_ACTION:
      console.log({ action });
      draft.productCategories = [];
      draft.productCategoriesError = action.error;
      draft.productCategoriesLoading = false;
  }
}, initialState);

export default itemsListScreenReducer;
