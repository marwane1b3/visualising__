import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ChoubikContainer state domain
 */

const ChoubikSlectorDomain = (state: any) =>
  state.ChoubikContainer || initialState;
const audioSelector = () =>
  createSelector(ChoubikSlectorDomain, (substate) => substate.audioPath);

const imageSelector = () =>
  createSelector(ChoubikSlectorDomain, (substate) => substate.photoArray);

const mapShowSelector = () =>
  createSelector(ChoubikSlectorDomain, (substate) => substate.showMap);
export { audioSelector, imageSelector, mapShowSelector };
