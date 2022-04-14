import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the kaalixWinPointsScreen state domain
 */

const selectKaalixWinPointsScreenDomain = (state: any) =>
  state.kaalixWinPointsScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by KaalixWinPointsScreen
 */

const makeSelectKaalixWinPointsScreen = () =>
  createSelector(selectKaalixWinPointsScreenDomain, (substate) => substate);

export default makeSelectKaalixWinPointsScreen;
export { selectKaalixWinPointsScreenDomain };
