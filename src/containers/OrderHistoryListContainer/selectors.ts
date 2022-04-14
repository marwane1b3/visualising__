import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderHistoryListContainer state domain
 */

const selectOrderHistoryListContainerDomain = (state: any) =>
  state.orderHistoryListContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderHistoryListContainer
 */

const makeSelectOrderHistoryListContainer = () =>
  createSelector(selectOrderHistoryListContainerDomain, (substate) => substate);
const selectOrdersList = () =>
  createSelector(
    selectOrderHistoryListContainerDomain,
    (substate) => substate.orderList,
  );
const selectLoading = () =>
  createSelector(
    selectOrderHistoryListContainerDomain,
    (substate) => substate.loading,
  );
const selectOrdersListError = () =>
  createSelector(
    selectOrderHistoryListContainerDomain,
    (substate) => substate.errorMsg,
  );

const selectButtonsActions = () =>
  createSelector(
    selectOrderHistoryListContainerDomain,
    (substate) => substate.ordersbuttonActions,
  );
const selectSelectedActionButton = () =>
  createSelector(
    selectOrderHistoryListContainerDomain,
    (substate) => substate.selectedActionButton,
  );
export default makeSelectOrderHistoryListContainer;
export {
  selectOrderHistoryListContainerDomain,
  selectOrdersListError,
  selectLoading,
  selectOrdersList,
  selectButtonsActions,
  selectSelectedActionButton,
};
