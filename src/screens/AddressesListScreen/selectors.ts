import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addressesListScreen state domain
 */

const selectAddressesListScreenDomain = (state: any) =>
  state.addressesListScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddressesListScreen
 */

const makeSelectAddressesListScreen = () =>
  createSelector(selectAddressesListScreenDomain, (substate) => substate);

export default makeSelectAddressesListScreen;
export { selectAddressesListScreenDomain };
