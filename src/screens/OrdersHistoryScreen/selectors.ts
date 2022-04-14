import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ordersHistoryScreen state domain
 */

const selectOrdersHistoryScreenDomain = (state: any) =>
  state.ordersHistoryScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrdersHistoryScreen
 */

const makeSelectOrdersHistoryScreen = () =>
  createSelector(selectOrdersHistoryScreenDomain, (substate) => substate);

export default makeSelectOrdersHistoryScreen;
export { selectOrdersHistoryScreenDomain };
