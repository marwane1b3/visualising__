import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ChoubikContainer state domain
 */

const EpressSelectorDomain = (state: any) =>
  state.ExpressScreen || initialState;
const audioSelector = () =>
  createSelector(EpressSelectorDomain, (substate) => substate.audioPath);

const imageSelector = () =>
  createSelector(EpressSelectorDomain, (substate) => substate.photoArray);

const textSelector = () =>
  createSelector(EpressSelectorDomain, (substate) => substate.term);
const mapShowSelector = () =>
  createSelector(EpressSelectorDomain, (substate) => substate.showMap);

const PickupLocationSelector = () =>
  createSelector(EpressSelectorDomain, (substate) => substate.PickupLocation);
const DestinationLocationSelector = () =>
  createSelector(
    EpressSelectorDomain,
    (substate) => substate.DestinationLocations,
  );

const DeliveryTimeOptionsSelector = () =>
  createSelector(
    EpressSelectorDomain,
    (substate) => substate.DeliveryTimeOptions,
  );
const DateSelector = () =>
  createSelector(EpressSelectorDomain, (substate) => substate.selectedDate);

const modalSelector = () =>
  createSelector(EpressSelectorDomain, (substate) => substate.showFlag);
export {
  audioSelector,
  imageSelector,
  mapShowSelector,
  textSelector,
  DestinationLocationSelector,
  PickupLocationSelector,
  DeliveryTimeOptionsSelector,
  DateSelector,
  modalSelector,
};
