import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cashBackScreen state domain
 */

const selectCashBackScreenDomain = (state: any) =>
  state.cashBackScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CashBackScreen
 */

const makeSelectCashBackScreen = () =>
  createSelector(selectCashBackScreenDomain, (substate) => substate);

export default makeSelectCashBackScreen;
export { selectCashBackScreenDomain };
