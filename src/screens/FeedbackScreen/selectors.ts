import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the feedbackScreen state domain
 */

const selectFeedbackScreenDomain = (state: any) =>
  state.feedbackScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FeedbackScreen
 */

const makeSelectFeedbackScreen = () =>
  createSelector(selectFeedbackScreenDomain, (substate) => substate);

export default makeSelectFeedbackScreen;
export { selectFeedbackScreenDomain };
