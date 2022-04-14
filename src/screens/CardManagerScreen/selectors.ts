import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cardManagerScreen state domain
 */

const selectCardManagerScreenDomain = (state: any) =>
  state.cardManagerScreen || initialState;

/**
 * Other specific selectors
 */
const makeSelectCardListScreen = createSelector(
  selectCardManagerScreenDomain,
  (substate) => substate.cardList,
);
const makeSelectLoadingScreen = createSelector(
  selectCardManagerScreenDomain,
  (substate) => substate.loading,
);
const makeSelectErrorScreen = createSelector(
  selectCardManagerScreenDomain,
  (substate) => substate.error,
);

/**
 * Default selector used by CardManagerScreen
 */

const makeSelectCardManagerScreen = () =>
  createSelector(selectCardManagerScreenDomain, (substate) => substate);

export default makeSelectCardManagerScreen;
export {
  selectCardManagerScreenDomain,
  makeSelectCardListScreen,
  makeSelectLoadingScreen,
  makeSelectErrorScreen,
};
