import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the checkout state domain
 */

const selectCheckoutDomain = (state: any) => state.checkout || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Checkout
 */

const makeSelectCheckout = () =>
  createSelector(selectCheckoutDomain, substate => substate);

export default makeSelectCheckout;
export { selectCheckoutDomain };
