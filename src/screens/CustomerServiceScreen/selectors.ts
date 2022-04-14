import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the customerServiceScreen state domain
 */

const selectCustomerServiceScreenDomain = (state: any) =>
  state.customerServiceScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CustomerServiceScreen
 */

const makeSelectCustomerServiceScreen = () =>
  createSelector(selectCustomerServiceScreenDomain, (substate) => substate);

export default makeSelectCustomerServiceScreen;
export { selectCustomerServiceScreenDomain };
