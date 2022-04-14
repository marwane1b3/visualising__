/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import languageProviderReducer from 'providers/LanguageProvider/reducer';

// function lastAction(state = null, action: string) {
//   return action;
// }

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    ...injectedReducers,
    // lastAction,
  });
  return rootReducer;
}
