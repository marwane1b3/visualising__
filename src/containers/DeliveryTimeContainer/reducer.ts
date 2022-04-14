import produce from 'immer';
import {
  SET_TIME_DELIVERY_OPTION,
  GET_TIME_DELIVERY_OPTION_ACTION,
  GET_MODAL_SHOW_ACTION,
  GET_DATE_ACTION,
} from './constants';

export const initialState = {
  DeliveryTimeOptions: [],
  loading: false,
  selectedDate: '',
  showFlag: false,
};
/* eslint-disable default-case, no-param-reassign */
const TimeDeliveryReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_TIME_DELIVERY_OPTION_ACTION:
      draft.loading = true;
      break;
    case SET_TIME_DELIVERY_OPTION:
      draft.loading = false;
      draft.DeliveryTimeOptions = action.DeliveryTimeOptions;
      break;
    case GET_DATE_ACTION:
      draft.loading = false;
      draft.selectedDate = action.date;
      break;
    case GET_MODAL_SHOW_ACTION:
      draft.loading = false;
      draft.showFlag = action.showFlag;
  }
}, initialState);

export default TimeDeliveryReducer;
