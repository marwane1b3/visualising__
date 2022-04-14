import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the paymentScreen state domain
 */

const selectPaymentScreenDomain = (state: any) => state.paymentScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PaymentScreen
 */

const makeSelectPaymentScreen = () =>
  createSelector(selectPaymentScreenDomain, substate => substate);

export default makeSelectPaymentScreen;
export { selectPaymentScreenDomain };
