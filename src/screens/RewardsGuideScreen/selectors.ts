import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the rewardsGuideScreen state domain
 */

const selectRewardsGuideScreenDomain = (state: any) =>
  state.rewardsGuideScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RewardsGuideScreen
 */

const makeSelectRewardsGuideScreen = () =>
  createSelector(selectRewardsGuideScreenDomain, (substate) => substate);

export default makeSelectRewardsGuideScreen;
export { selectRewardsGuideScreenDomain };
