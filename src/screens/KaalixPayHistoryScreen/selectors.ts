import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the kaalixPayHistoryScreen state domain
 */

const selectKaalixPayHistoryScreenDomain = (state: any) =>
  state.kaalixPayHistoryScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by KaalixPayHistoryScreen
 */

const makeSelectKaalixPayHistoryScreen = () =>
  createSelector(selectKaalixPayHistoryScreenDomain, (substate) => substate);

export default makeSelectKaalixPayHistoryScreen;
export { selectKaalixPayHistoryScreenDomain };
