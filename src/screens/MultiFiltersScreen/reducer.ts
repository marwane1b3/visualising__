import produce from 'immer';
import {
  GET_MULTI_FILTERS_DATA,
  REQUEST_MULTI_FILTERS_DATA,
} from './constants';

export const initialState = {
  error: false,
  loading: false,
  filters: [],
};
const multiFiltersReducer = produce((draft, action) => {
  switch (action.type) {
    case REQUEST_MULTI_FILTERS_DATA:
      draft.error = false;
      draft.loading = true;
      break;
    case GET_MULTI_FILTERS_DATA:
      draft.error = false;
      draft.loading = false;
      draft.filters = action.filters;
      break;
  }
}, initialState);

export default multiFiltersReducer;
