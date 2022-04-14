import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMultiFiltersDomain = (state: any) => state.filters || initialState;

const getFilters = () =>
  createSelector(selectMultiFiltersDomain, (substate) => substate.filters);

export { selectMultiFiltersDomain, getFilters };
