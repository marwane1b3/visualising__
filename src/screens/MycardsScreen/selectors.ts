import { createSelector } from 'reselect';
import { initialState } from './reducer';
import {selectUserDetailsDomain} from "../../containers/UserDetails/selectors";

/**
 * Direct selector to the mycardsScreen state domain
 */

const selectMycardsScreenDomain = (state: any) => state.mycardsScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MycardsScreen
 */

const makeSelectMycardsScreen = () =>
  createSelector(selectMycardsScreenDomain, substate => substate);

export default makeSelectMycardsScreen;
export { selectMycardsScreenDomain  };
