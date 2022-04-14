import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the splashScreen state domain
 */

const selectSplashScreenDomain = (state: any) =>
  state.splashScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SplashScreen
 */

const makeSelectSplashScreen = () =>
  createSelector(selectSplashScreenDomain, (substate) => substate);

export default makeSelectSplashScreen;
export { selectSplashScreenDomain };
