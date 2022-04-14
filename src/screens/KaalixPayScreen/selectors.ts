import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the kaalixPayScreen state domain
 */

const selectKaalixPayScreenDomain = (state: any) =>
  state.kaalixPayScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by KaalixPayScreen
 */

const makeSelectKaalixPayScreen = () =>
  createSelector(selectKaalixPayScreenDomain, (substate) => substate);

export default makeSelectKaalixPayScreen;
export { selectKaalixPayScreenDomain };
