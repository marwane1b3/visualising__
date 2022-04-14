import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectServicesContainerDomain = (state: any) =>
  state.ServicesContainer || initialState;

export {
 
};
