import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the kaalixSmileHistoriesScreen state domain
 */

const selectKaalixSmileHistoriesScreenDomain = (state: any) =>
  state.kaalixSmileHistoriesScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by KaalixSmileHistoriesScreen
 */

const makeSelectKaalixSmileHistoriesScreen = () =>
  createSelector(
    selectKaalixSmileHistoriesScreenDomain,
    (substate) => substate,
  );

export default makeSelectKaalixSmileHistoriesScreen;
export { selectKaalixSmileHistoriesScreenDomain };
