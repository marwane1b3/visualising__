import produce from 'immer';
import {
  REQUEST_MULTI_PROMOS,
  SET_MULTI_PROMOS,
  SET_PROMO_DATA,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  selectedPromoNames: [],
  promoNames: [],
};
const MultiPromoReducer = produce((draft, action) => {
  switch (action.type) {
    case REQUEST_MULTI_PROMOS:
      draft.loading = true;
      draft.error = false;
      break;
    case SET_MULTI_PROMOS:
      draft.loading = false;
      draft.error = false;
      draft.selectedPromoNames = action.selectedPromoNames;
      break;
    case SET_PROMO_DATA:
      draft.loading = false;
      draft.error = false;
      draft.promoNames = action.promoNames;
      break;
  }
}, initialState);

export default MultiPromoReducer;
