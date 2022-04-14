import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the reclamationContainer state domain
 */

const selectReclamationContainerDomain = (state: any) =>
  state.reclamationContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReclamationContainer
 */

const makeSelectReclamationContainer = () =>
  createSelector(selectReclamationContainerDomain, (substate) => substate);
const makeSelectResponse = () =>
  createSelector(
    selectReclamationContainerDomain,
    (substate) => substate.response,
  );
const makeSelectErorr = () =>
  createSelector(
    selectReclamationContainerDomain,
    (substate) => substate.error,
  );
const makeSelectLoading = () =>
  createSelector(
    selectReclamationContainerDomain,
    (substate) => substate.loading,
  );

const makeSelectDescription = () =>
  createSelector(
    selectReclamationContainerDomain,
    (substate) => substate.description,
  );
const makeSelectBody = () =>
  createSelector(selectReclamationContainerDomain, (substate) => substate.body);

export default makeSelectReclamationContainer;
export {
  selectReclamationContainerDomain,
  makeSelectResponse,
  makeSelectErorr,
  makeSelectLoading,
  makeSelectDescription,
  makeSelectBody,
};
