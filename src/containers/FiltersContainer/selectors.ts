import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the FiltersContainer state domain
 */

const selectFiltersContainerDomain = (state: any) =>
  state.FiltersContainer || initialState;

/**
 * Other specific selectors
 */

const makeSelecttagList = () =>
  createSelector(selectFiltersContainerDomain, (substate) => substate.tagList);

export { selectFiltersContainerDomain, makeSelecttagList };
