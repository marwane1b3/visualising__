import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the DeliveryTimeContainer state domain
 */

const DeliveryTimeDomainSelector = (state: any) =>
  state.DeliveryTimeContainer || initialState;

const DeliveryTimeOptionsSelector = () =>
  createSelector(
    DeliveryTimeDomainSelector,
    (substate) => substate.DeliveryTimeOptions,
  );
const DateSelector = () =>
  createSelector(
    DeliveryTimeDomainSelector,
    (substate) => substate.selectedDate,
  );

const modalSelector = () =>
  createSelector(DeliveryTimeDomainSelector, (substate) => substate.showFlag);
export { DeliveryTimeOptionsSelector, DateSelector, modalSelector };
