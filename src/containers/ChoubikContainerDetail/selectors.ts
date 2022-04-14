import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the DeliveryTimeContainer state domain
 */

const ChoubikDetailContainer = (state: any) =>
  state.ChoubikContainerDetail || initialState;

const DeliveryTimeOptionsSelector = () =>
  createSelector(
    ChoubikDetailContainer,
    (substate) => substate.DeliveryTimeOptions,
  );
const DateSelector = () =>
  createSelector(ChoubikDetailContainer, (substate) => substate.selectedDate);

const modalSelector = () =>
  createSelector(ChoubikDetailContainer, (substate) => substate.showFlag);
export { DeliveryTimeOptionsSelector, DateSelector, modalSelector };
