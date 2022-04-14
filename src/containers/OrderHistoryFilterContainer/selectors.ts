import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderHistoryFilterContainer state domain
 */

const selectOrderHistoryFilterContainerDomain = (state: any) =>
  state.orderHistoryFilterContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderHistoryFilterContainer
 */

const makeSelectOrderHistoryFilterContainer = () =>
  createSelector(
    selectOrderHistoryFilterContainerDomain,
    (substate) => substate,
  );

const getOrdersFilterData = () =>
  createSelector(selectOrderHistoryFilterContainerDomain, (sub) => sub.data);
const getSelectedHistoryFilerData = () =>
  createSelector(
    selectOrderHistoryFilterContainerDomain,
    (sub) => sub.selectedData,
  );

const getLoader = () =>
  createSelector(selectOrderHistoryFilterContainerDomain, (sub) => sub.loading);

export default makeSelectOrderHistoryFilterContainer;
export { getLoader, getSelectedHistoryFilerData, getOrdersFilterData };
