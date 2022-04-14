import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userDetails state domain
 */

const selectUserDetailsDomain = (state: any) =>
  state.userDetails || initialState;

/**
 * Other specific selectors
 */

const makeSelectUserDetailsData = createSelector(
  selectUserDetailsDomain,
  (substate) => substate.userDetails,
);
const makeSelectLoading = createSelector(
  selectUserDetailsDomain,
  (substate) => substate.loading,
);
const makeSelectError = createSelector(
  selectUserDetailsDomain,
  (substate) => substate.error,
);

/**
 * Default selector used by UserDetails
 */

const makeSelectUserDetails = () =>
  createSelector(selectUserDetailsDomain, (substate) => substate);

export default makeSelectUserDetails;
export {
  selectUserDetailsDomain,
  makeSelectUserDetailsData,
  makeSelectLoading,
  makeSelectError,
};
