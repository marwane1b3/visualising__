import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signInScreen state domain
 */

const selectSignInScreenDomain = (state: any) =>
  state.signInScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignInScreen
 */

const makeSelectSignInScreen = () =>
  createSelector(selectSignInScreenDomain, (substate) => substate);

export default makeSelectSignInScreen;
export { selectSignInScreenDomain };
