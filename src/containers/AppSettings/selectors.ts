import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the appSettings state domain
 */

const selectAppSettingsDomain = (state: any) =>
  state.appSettings || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AppSettings
 */

const makeSelectAppSettings = () =>
  createSelector(selectAppSettingsDomain, (substate) => substate);

export default makeSelectAppSettings;
export { selectAppSettingsDomain };
