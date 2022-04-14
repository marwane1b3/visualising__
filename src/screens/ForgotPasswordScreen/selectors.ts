import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forgotPasswordScreen state domain
 */

const selectForgotPasswordScreenDomain = (state: any) =>
  state.forgotPasswordScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ForgotPasswordScreen
 */

const makeSelectForgotPasswordScreen = () =>
  createSelector(selectForgotPasswordScreenDomain, (substate) => substate);

export default makeSelectForgotPasswordScreen;
export { selectForgotPasswordScreenDomain };
