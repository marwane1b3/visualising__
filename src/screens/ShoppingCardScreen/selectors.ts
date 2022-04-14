import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the shoppingCardScreen state domain
 */

const selectShoppingCardScreenDomain = (state: any) =>
  state.shoppingCardScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ShoppingCardScreen
 */

const makeSelectShoppingCardScreen = () =>
  createSelector(selectShoppingCardScreenDomain, (substate) => substate);

const makeSelectShoppingCardProducts = createSelector(
  selectShoppingCardScreenDomain,
  (substate) => substate.products,
);

export default makeSelectShoppingCardScreen;
export { selectShoppingCardScreenDomain, makeSelectShoppingCardProducts };
