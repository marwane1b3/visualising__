import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCategoryServicesDomain = (state: any) =>
  state.services || initialState;

/**
 * Other specific selectors
 */

const makeSelectServices = () =>
  createSelector(selectCategoryServicesDomain, (substate) => substate.services);

export { selectCategoryServicesDomain, makeSelectServices };
