import {
  GET_TIME_DELIVERY_OPTION_ACTION,
  SET_TIME_DELIVERY_OPTION,
  GET_DATE_ACTION,
  GET_MODAL_SHOW_ACTION,
} from './constants';
export function requestTimeDeliveryOptionAction() {
  return {
    type: GET_TIME_DELIVERY_OPTION_ACTION,
  };
}

export function setTimeDeliveryOption(DeliveryTimeOptions: any) {
  return {
    type: SET_TIME_DELIVERY_OPTION,
    DeliveryTimeOptions,
  };
}

export function getDateAction(date: any) {
  return {
    type: GET_DATE_ACTION,
    date,
  };
}

export function getModalShowAction(showFlag: boolean) {
  return {
    type: GET_MODAL_SHOW_ACTION,
    showFlag,
  };
}
