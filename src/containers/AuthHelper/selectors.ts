import { sub } from 'react-native-reanimated';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authHelper state domain
 */

const selectAuthHelperDomain = (state: any) =>
  state.authHelper || initialState;

/**
 * Other specific selectors
 */

const makeSelectSignUser = createSelector(
  selectAuthHelperDomain,
  (substate) => substate.user,
);

const makeSelectSignPayload = createSelector(
  selectAuthHelperDomain,
  (substate) => substate.signinPayload,
);

const makeSelectSignLoading = createSelector(
  selectAuthHelperDomain,
  (substate) => substate.signinLoading,
);

const makeSelectSignError = createSelector(
  selectAuthHelperDomain,
  (substate) => substate.signinError,
);


const makeSelectRegisterPayload = createSelector(
  selectAuthHelperDomain,
  (substate) => substate.registerPayload,
);

const makeSelectRegisterLoading = createSelector(
  selectAuthHelperDomain,
  (substate) => substate.registerLoading,
);

const makeSelectRegisterError = createSelector(
  selectAuthHelperDomain,
  (substate) => substate.registerError,
);
/**
 * Default selector used by AuthHelper
 */

const makeSelectAuthHelper = () =>
  createSelector(selectAuthHelperDomain, (substate) => substate);

export default makeSelectAuthHelper;
export {
  selectAuthHelperDomain,
  makeSelectSignUser,
  makeSelectSignPayload,
  makeSelectSignLoading,
  makeSelectSignError,
  makeSelectRegisterError,
  makeSelectRegisterLoading,
  makeSelectRegisterPayload
};
