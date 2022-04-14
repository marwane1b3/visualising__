import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the alertsProvider state domain
 */

const selectAlertsProviderDomain = (state: any) =>
  state.alertsProvider || initialState;

/**
 * Other specific selectors
 */

const makeSelectAlerts = createSelector(
  selectAlertsProviderDomain,
  (substate) => substate.alerts,
);

/**
 * Default selector used by AlertsProvider
 */

const makeSelectAlertsProvider = () =>
  createSelector(selectAlertsProviderDomain, (substate) => substate);

export default makeSelectAlertsProvider;
export { selectAlertsProviderDomain, makeSelectAlerts };
