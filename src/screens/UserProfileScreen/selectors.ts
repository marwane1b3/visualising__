import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userProfileScreen state domain
 */

const selectUserProfileScreenDomain = (state: any) =>
  state.userProfileScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserProfileScreen
 */

const makeSelectUserProfileScreen = () =>
  createSelector(selectUserProfileScreenDomain, (substate) => substate);

export default makeSelectUserProfileScreen;
export { selectUserProfileScreenDomain };
