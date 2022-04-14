import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itemsListScreen state domain
 */

const selectItemsListScreenDomain = (state: any) =>
  state.itemsListScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ItemsListScreen
 */
const selectLoader = () =>
  createSelector(selectItemsListScreenDomain, (substate) => substate.loading);
const selectIndex = () =>
  createSelector(selectItemsListScreenDomain, (substate) => substate.index);
const selectError = () =>
  createSelector(selectItemsListScreenDomain, (substate) => substate.error);
const makeSelectItemsListScreen = () =>
  createSelector(selectItemsListScreenDomain, (substate) => substate.items);
const selectStoreId = () =>
  createSelector(selectItemsListScreenDomain, (substate) => substate.id);
const selectProducts = () =>
  createSelector(selectItemsListScreenDomain, (substate) => substate.products);

const selectFullList = () =>
  createSelector(selectItemsListScreenDomain, (substate) => substate.fullList);

const makeSelectProductCategories = () =>
  createSelector(
    selectItemsListScreenDomain,
    (substate) => substate.productCategories,
  );

export default makeSelectItemsListScreen;
export {
  selectItemsListScreenDomain,
  selectStoreId,
  selectProducts,
  selectLoader,
  selectError,
  selectFullList,
  selectIndex,
  makeSelectProductCategories,
};
