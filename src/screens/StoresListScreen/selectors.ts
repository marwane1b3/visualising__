// import { createSelector } from 'reselect';
// import { initialState } from './reducer';

// /**
//  * Direct selector to the storesListScreen state domain
//  */

// const selectStoresListScreenDomain = (state: any) =>
//   state.storesListScreen || initialState;

// /**
//  * Other specific selectors
//  */

// /**
//  * Default selector used by StoresListScreen
//  */

// const makeSelectStoresListScreen = () =>
//   createSelector(selectStoresListScreenDomain, (substate) => substate);

// const makeSelectPayload = () =>
//   createSelector(selectStoresListScreenDomain, (substate) => substate.payload);

// const makeSelectError = () =>
//   createSelector(selectStoresListScreenDomain, (substate) => substate.error);

// const makeSelectLoading = () =>
//   createSelector(selectStoresListScreenDomain, (substate) => substate.loading);
// export default makeSelectStoresListScreen;
// export {
//   selectStoresListScreenDomain,
//   makeSelectPayload,
//   makeSelectError,
//   makeSelectLoading,
// };
