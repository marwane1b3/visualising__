import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderDetailsScreen state domain
 */

const selectOrderDetailsScreenDomain = (state: any) =>
  state.orderDetailsScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderDetailsScreen
 */

const makeSelectOrderDetailsScreen = () =>
  createSelector(selectOrderDetailsScreenDomain, (substate) => substate);

export default makeSelectOrderDetailsScreen;
export { selectOrderDetailsScreenDomain };
