import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the passwordCodeVerificationScreen state domain
 */

const selectPasswordCodeVerificationScreenDomain = (state: any) =>
  state.passwordCodeVerificationScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PasswordCodeVerificationScreen
 */

const makeSelectPasswordCodeVerificationScreen = () =>
  createSelector(
    selectPasswordCodeVerificationScreenDomain,
    (substate) => substate,
  );

export default makeSelectPasswordCodeVerificationScreen;
export { selectPasswordCodeVerificationScreenDomain };
