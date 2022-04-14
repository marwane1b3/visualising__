import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ordersScreen state domain
 */

const selectOrdersScreenDomain = (state: any) =>
  state.ordersScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrdersScreen
 */

const makeSelectOrdersScreen = () =>
  createSelector(selectOrdersScreenDomain, (substate) => substate);

export default makeSelectOrdersScreen;
export { selectOrdersScreenDomain };
