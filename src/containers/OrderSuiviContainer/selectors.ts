import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderSuiviContainer state domain
 */

const selectOrderSuiviContainerDomain = (state) =>
  state.orderSuiviContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderSuiviContainer
 */

const makeSelectOrderSuiviContainer = () =>
  createSelector(selectOrderSuiviContainerDomain, (substate) => substate);

export default makeSelectOrderSuiviContainer;
export { selectOrderSuiviContainerDomain };
