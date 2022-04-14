import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ChoubikScreenDomain state domain
 */

const ChoubikScreenDomain = (state: any) => state.ChoubikScreen || initialState;
const audioSelector = () =>
  createSelector(ChoubikScreenDomain, (substate) => substate.audioPath);

const imageSelector = () =>
  createSelector(ChoubikScreenDomain, (substate) => substate.photoArray);

const textSelector = () =>
  createSelector(ChoubikScreenDomain, (substate) => substate.term);

const mapShowSelector = () =>
  createSelector(ChoubikScreenDomain, (substate) => substate.showMap);
export { audioSelector, imageSelector, mapShowSelector, textSelector };
