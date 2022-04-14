import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the storesListContainer state domain
 */

const selectStoresListContainerDomain = (state: any) =>
  state.storesListContainer || initialState;

/**
 * Other specific selectors
 */

// const selectFilteredData = (state: any) => {
//   state.filteredData || initialState;
// };
// const makeFilteredData = () => {
//   createSelector(selectFilteredData, (sub) => sub);
// };
// const makeSelectStoresListScreen = () =>
//   createSelector(selectStoresListContainerDomain, (substate) => substate);

// const makeSelectPayload = () =>
//   createSelector(
//     selectStoresListContainerDomain,
//     (substate) => substate.payload,
//   );

const makeSelectError = () =>
  createSelector(selectStoresListContainerDomain, (substate) => substate.error);

const makeSelectLoading = () =>
  createSelector(
    selectStoresListContainerDomain,
    (substate) => substate.loading,
  );

const makeSelectStores = () =>
  createSelector(
    selectStoresListContainerDomain,
    (substate) => substate.stores,
  );
const selectId = () =>
  createSelector(selectStoresListContainerDomain, (substate) => substate.id);
export default selectStoresListContainerDomain;
export {
  selectStoresListContainerDomain,
  // makeSelectPayload,
  makeSelectStores,
  makeSelectError,
  makeSelectLoading,
  // selectFilteredData,
  // makeFilteredData,
  selectId,
};
