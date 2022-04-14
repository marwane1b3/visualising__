import { sub } from 'react-native-reanimated';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addressesHandler state domain
 */

const selectAddressesHandlerDomain = (state: any) =>
  state.addressesHandler || initialState;

/**
 * Other specific selectors
 */

const makeSelectLoading = createSelector(
  selectAddressesHandlerDomain,
  (substate) => substate.loading,
);
const makeSelectError = createSelector(
  selectAddressesHandlerDomain,
  (substate) => substate.error,
);
const makeSelectAddressesList = createSelector(
  selectAddressesHandlerDomain,
  (substate) => substate.addressesList,
);
const makeSelectCities = createSelector(
  selectAddressesHandlerDomain,
  (substate) => substate.cities,
);

const makeSelectCustomerGPS = createSelector(
  selectAddressesHandlerDomain,
  (substate) => substate.customerGPS,
);

const makeSelectPickedAddress = createSelector(
  selectAddressesHandlerDomain,
  (substate) => substate.pickedAddress,
);

const makeSelectDestinationAddresses = createSelector(
  selectAddressesHandlerDomain,
  (substate) => substate.destinationAddresses,
);
/**
 * Default selector used by AddressesHandler
 */

const makeSelectAddressesHandler = () =>
  createSelector(selectAddressesHandlerDomain, (substate) => substate);

export default makeSelectAddressesHandler;
export {
  selectAddressesHandlerDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectAddressesList,
  makeSelectCities,
  makeSelectCustomerGPS,
  makeSelectPickedAddress,
  makeSelectDestinationAddresses,
};
