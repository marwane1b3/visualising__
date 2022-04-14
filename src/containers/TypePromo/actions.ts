import {
  REQUEST_MULTI_PROMOS,
  SET_PROMO_DATA,
  SET_MULTI_PROMOS,
} from './constants';

export function requestMultiPromoAction() {
  return {
    type: REQUEST_MULTI_PROMOS,
  };
}

export function setMUltiPromoAction(triName: any) {
  return {
    type: SET_MULTI_PROMOS,
    selectedPromoNames: triName,
  };
}
export function setMultiPromoData(data: any) {
  return {
    type: SET_PROMO_DATA,
    promoNames: data,
  };
}
