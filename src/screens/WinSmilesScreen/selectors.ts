import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the winSmilesScreen state domain
 */

const selectWinSmilesScreenDomain = (state: any) =>
  state.winSmilesScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WinSmilesScreen
 */

const makeSelectWinSmilesScreen = () =>
  createSelector(selectWinSmilesScreenDomain, (substate) => substate);

export default makeSelectWinSmilesScreen;
export { selectWinSmilesScreenDomain };
