import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMoreSingleCategryName = (state: any) =>
  state.filterNames || initialState;

const getName = () =>
  createSelector(
    selectMoreSingleCategryName,
    (substate) => substate.filterNames,
  );

const getLoader = () =>
  createSelector(selectMoreSingleCategryName, (sub) => sub.loading);
const makeSelecttagList = () =>
  createSelector(selectMoreSingleCategryName, (substate) => substate.tagList);

export { selectMoreSingleCategryName, getName, getLoader, makeSelecttagList };
