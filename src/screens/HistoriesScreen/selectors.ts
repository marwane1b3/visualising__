import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the historiesScreen state domain
 */

const selectHistoriesScreenDomain = (state: any) =>
  state.historiesScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HistoriesScreen
 */

const makeSelectHistoriesScreen = () =>
  createSelector(selectHistoriesScreenDomain, (substate) => substate);

export default makeSelectHistoriesScreen;
export { selectHistoriesScreenDomain };
