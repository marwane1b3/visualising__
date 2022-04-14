import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the referralScreen state domain
 */

const selectReferralScreenDomain = (state: any) =>
  state.referralScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReferralScreen
 */

const makeSelectReferralScreen = () =>
  createSelector(selectReferralScreenDomain, (substate) => substate);

export default makeSelectReferralScreen;
export { selectReferralScreenDomain };
