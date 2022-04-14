import produce from 'immer';
import {
  GET_SERVICE_CATEGORIES_ACTION,
  GET_SERVICE_CATEGORIES_ERROR_ACTION,
  GET_SERVICE_CATEGORIES_SUCCESS_ACTION
} from './constants';

export const initialState = {
  error: false,
  loading: false,
  serviceCategories: [],
};

/* eslint-disable default-case, no-param-reassign */
const servicesListReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_SERVICE_CATEGORIES_ACTION:
      draft.loading = true;
      draft.error = false;
      break;
    case GET_SERVICE_CATEGORIES_SUCCESS_ACTION:
      draft.loading = false;
      draft.error = false;
      draft.serviceCategories = action.serviceCategories;
      break;
    case GET_SERVICE_CATEGORIES_ERROR_ACTION:
      draft.loading = false;
      draft.error = true;
      draft.serviceCategories = [];

      break;
  }
}, initialState);

export default servicesListReducer;
