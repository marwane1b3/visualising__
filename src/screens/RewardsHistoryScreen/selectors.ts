import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the rewardsHistoryScreen state domain
 */

const selectRewardsHistoryScreenDomain = (state: any) =>
  state.rewardsHistoryScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RewardsHistoryScreen
 */

const makeSelectRewardsHistoryScreen = () =>
  createSelector(selectRewardsHistoryScreenDomain, (substate) => substate);

export default makeSelectRewardsHistoryScreen;
export { selectRewardsHistoryScreenDomain };
