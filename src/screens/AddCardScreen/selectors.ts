import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addCardScreen state domain
 */

const selectAddCardScreenDomain = (state: any) => state.addCardScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddCardScreen
 */

const makeSelectAddCardScreen = () =>
  createSelector(selectAddCardScreenDomain, substate => substate);

export default makeSelectAddCardScreen;
export { selectAddCardScreenDomain };
