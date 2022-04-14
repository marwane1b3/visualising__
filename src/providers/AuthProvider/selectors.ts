import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authProvider state domain
 */

const selectAuthProviderDomain = (state: any) =>
  state.authProvider || initialState;

/**
 * Other specific selectors
 */

const makeSelectToken = createSelector(
  selectAuthProviderDomain,
  (substate) => substate.token,
);

const makeSelectLoading = createSelector(
  selectAuthProviderDomain,
  (substate) => substate.loading,
);

/**
 * Default selector used by AuthProvider
 */

const makeSelectAuthProvider = () =>
  createSelector(selectAuthProviderDomain, (substate) => substate);

export default makeSelectAuthProvider;
export { selectAuthProviderDomain, makeSelectToken, makeSelectLoading };
