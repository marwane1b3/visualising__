import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapScreen state domain
 */

const selectMapScreenDomain = (state: any) => state.mapScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MapScreen
 */

const makeSelectMapScreen = () =>
  createSelector(selectMapScreenDomain, (substate) => substate);

export default makeSelectMapScreen;
export { selectMapScreenDomain };
