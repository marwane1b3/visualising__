import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the checkoutPaymentScreen state domain
 */

const selectCheckoutPaymentScreenDomain = (state: any) => state.checkoutPaymentScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CheckoutPaymentScreen
 */

const makeSelectCheckoutPaymentScreen = () =>
  createSelector(selectCheckoutPaymentScreenDomain, substate => substate);

export default makeSelectCheckoutPaymentScreen;
export { selectCheckoutPaymentScreenDomain };
