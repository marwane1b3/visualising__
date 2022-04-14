import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productsListScreen state domain
 */

const selectProductsListScreenDomain = (state: any) =>
  state.productsListScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductsListScreen
 */

const makeSelectProductsListScreen = () =>
  createSelector(selectProductsListScreenDomain, (substate) => substate);

export default makeSelectProductsListScreen;
export { selectProductsListScreenDomain };
