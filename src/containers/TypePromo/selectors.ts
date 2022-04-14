import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMultiPromoNamesDomain = (state: any) =>
  state.typePromos || initialState;

//const SelectMultiTriDataDomain = (state: any) => state.triNames || initialState;

const getPromoData = () =>
  createSelector(selectMultiPromoNamesDomain, (sub) => sub.promoNames);
const getPromoName = () =>
  createSelector(selectMultiPromoNamesDomain, (sub) => sub.selectedPromoNames);

const getLoader = () =>
  createSelector(selectMultiPromoNamesDomain, (sub) => sub.loading);

export {
  selectMultiPromoNamesDomain,
  getPromoData,
  getPromoName,
  // SelectMultiTriDataDomain,
  getLoader,
};
