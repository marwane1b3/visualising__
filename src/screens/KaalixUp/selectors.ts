import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the kaalixUp state domain
 */

const selectKaalixUpDomain = (state: any) => state.kaalixUp || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by KaalixUp
 */
 
 const makeSelectUserLoyaltyData = createSelector(
  selectKaalixUpDomain,
  (substate) => substate.userLoyalty,
);
const makeSelectLoading = createSelector(
  selectKaalixUpDomain,
  (substate) => substate.loading,
);
const makeSelectError = createSelector(
  selectKaalixUpDomain,
  (substate) => substate.error,
);

const makeSelectKaalixUp = () =>
  createSelector(selectKaalixUpDomain, (substate) => substate);

export default makeSelectKaalixUp;
export { selectKaalixUpDomain ,makeSelectUserLoyaltyData,makeSelectLoading,makeSelectError};
