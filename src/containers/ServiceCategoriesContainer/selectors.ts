import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCategoryServicesDomain = (state: any) =>
  state.ServiceCategoriesContainer || initialState;

const makeSelectServiceCategories = () =>
  createSelector(
    selectCategoryServicesDomain,
    (substate) => substate.serviceCategories,
  );
const makeSelectloading = () =>
  createSelector(selectCategoryServicesDomain, (substate) => substate.loading);
export {
  selectCategoryServicesDomain,
  makeSelectServiceCategories,
  makeSelectloading,
};
