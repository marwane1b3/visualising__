import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the NotInZoneComponent state domain
 */

const selectNotInZoneComponentDomain = (state: any) =>
  state.NotInZoneComponent || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NotInZoneComponent
 */

const makeSelectNotInZoneComponent = () =>
  createSelector(selectNotInZoneComponentDomain, (substate) => substate);

export default makeSelectNotInZoneComponent;
export { selectNotInZoneComponentDomain };
