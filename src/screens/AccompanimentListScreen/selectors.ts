import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accompanimentListScreen state domain
 */

const selectAccompanimentListScreenDomain = (state: any) =>
  state.accompanimentListScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AccompanimentListScreen
 */

const makeSelectAccompanimentListScreen = () =>
  createSelector(selectAccompanimentListScreenDomain, (substate) => substate);

export default makeSelectAccompanimentListScreen;
export { selectAccompanimentListScreenDomain };
