import { createSelector } from 'reselect';
import { initialState } from './reducer';

const SelectMultiTriNamesDomain = (state: any) =>
  state.trisContainer || initialState;

//const SelectMultiTriDataDomain = (state: any) => state.triNames || initialState;

const getTriData = () =>
  createSelector(SelectMultiTriNamesDomain, (sub) => sub.triNames);
const getTriName = () =>
  createSelector(SelectMultiTriNamesDomain, (sub) => sub.selectedTriNames);

const getLoader = () =>
  createSelector(SelectMultiTriNamesDomain, (sub) => sub.loading);

export {
  SelectMultiTriNamesDomain,
  getTriData,
  getTriName,
  // SelectMultiTriDataDomain,
  getLoader,
};
