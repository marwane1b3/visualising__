import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the winPointsScreen state domain
 */

const selectWinPointsScreenDomain = (state: any) =>
  state.winPointsScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WinPointsScreen
 */

const makeSelectWinPointsScreen = () =>
  createSelector(selectWinPointsScreenDomain, (substate) => substate);

export default makeSelectWinPointsScreen;
export { selectWinPointsScreenDomain };
