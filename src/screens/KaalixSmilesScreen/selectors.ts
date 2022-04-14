import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the kaalixSmilesScreen state domain
 */

const selectKaalixSmilesScreenDomain = (state: any) =>
  state.kaalixSmilesScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by KaalixSmilesScreen
 */

const makeSelectKaalixSmilesScreen = () =>
  createSelector(selectKaalixSmilesScreenDomain, (substate) => substate);

export default makeSelectKaalixSmilesScreen;
export { selectKaalixSmilesScreenDomain };
