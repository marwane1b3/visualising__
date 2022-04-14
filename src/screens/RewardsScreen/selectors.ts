import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the rewardsScreen state domain
 */

const selectRewardsScreenDomain = (state: any) =>
  state.rewardsScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RewardsScreen
 */

const makeSelectRewardsScreen = () =>
  createSelector(selectRewardsScreenDomain, (substate) => substate);

export default makeSelectRewardsScreen;
export { selectRewardsScreenDomain };
