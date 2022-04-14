import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productsCategoriesScreen state domain
 */

const selectProductsCategoriesScreenDomain = (state: any) =>
  state.productsCategoriesScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductsCategoriesScreen
 */

const makeSelectProductsCategoriesScreen = () =>
  createSelector(selectProductsCategoriesScreenDomain, (substate) => substate);

export default makeSelectProductsCategoriesScreen;
export { selectProductsCategoriesScreenDomain };
