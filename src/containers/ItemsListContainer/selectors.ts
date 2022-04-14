import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itemsListContainer state domain
 */

const selectItemsListContainerDomain = (state: any) =>
  state.itemsListContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ItemsListContainer
 */

const makeSelectItemsListContainer = () =>
  createSelector(selectItemsListContainerDomain, (substate) => substate);

export default makeSelectItemsListContainer;
export { selectItemsListContainerDomain };
