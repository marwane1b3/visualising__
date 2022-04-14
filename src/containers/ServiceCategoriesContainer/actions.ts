import {
  GET_SERVICE_CATEGORIES_ACTION,
  GET_SERVICE_CATEGORIES_ERROR_ACTION,
  GET_SERVICE_CATEGORIES_SUCCESS_ACTION,
} from './constants';

export function getServiceCategoriesAction() {
  return {
    type: GET_SERVICE_CATEGORIES_ACTION,
  };
}

export function getServiceCategoriesSuccessAction(data: any) {
  return {
    type: GET_SERVICE_CATEGORIES_SUCCESS_ACTION,
    serviceCategories: data,
  };
}

export function getServiceCategoriesErrorAction(error: any) {
  return {
    type: GET_SERVICE_CATEGORIES_ERROR_ACTION,
    error: error,
  };
}
