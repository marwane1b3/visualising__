import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerForm state domain
 */

const selectRegisterFormDomain = (state: any) =>
  state.registerForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RegisterForm
 */

const makeSelectRegisterForm = () =>
  createSelector(selectRegisterFormDomain, (substate) => substate);

export default makeSelectRegisterForm;
export {
  selectRegisterFormDomain,
};
