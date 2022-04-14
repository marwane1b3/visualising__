import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorialScreen state domain
 */

const selectTutorialScreenDomain = (state: any) =>
  state.tutorialScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TutorialScreen
 */

const makeSelectTutorialScreen = () =>
  createSelector(selectTutorialScreenDomain, (substate) => substate);

export default makeSelectTutorialScreen;
export { selectTutorialScreenDomain };
