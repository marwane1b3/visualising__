import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pourboirContainer state domain
 */

const selectPourboirContainerDomain = (state: any) =>
  state.pourboirContainer || initialState;

/////// card selectors

const makeSelectCard = () =>
  createSelector(selectPourboirContainerDomain, (substate) => substate.card);
const makeSelectCardMsg = () =>
  createSelector(selectPourboirContainerDomain, (substate) => substate.cardMsg);

////////  kaalixPaySelectors
const makeSelectMoney = () =>
  createSelector(selectPourboirContainerDomain, (substate) => substate.money);
const makeSelectKaalixPoints = () =>
  createSelector(
    selectPourboirContainerDomain,
    (substate) => substate.kaalixLoyalty,
  );
const makeSelectKaalixLoyaltyMsg = () =>
  createSelector(
    selectPourboirContainerDomain,
    (substate) => substate.kaalixLoyaltyMsg,
  );
////////  KaalixLoyaltyPaymentSelectors
const makeSelectLoading = () =>
  createSelector(selectPourboirContainerDomain, (substate) => substate.loading);

const makeSelectError = () =>
  createSelector(selectPourboirContainerDomain, (substate) => substate.error);

const makeSelectBody = () =>
  createSelector(selectPourboirContainerDomain, (substate) => substate.body);
const makeSelectResponse = () =>
  createSelector(
    selectPourboirContainerDomain,
    (substate) => substate.response,
  );

/**
 * Default selector used by PourboirContainer
 */

const makeSelectPourboirContainer = () =>
  createSelector(selectPourboirContainerDomain, (substate) => substate);

export default makeSelectPourboirContainer;
export {
  selectPourboirContainerDomain,
  makeSelectBody,
  makeSelectError,
  makeSelectLoading,
  makeSelectResponse,
  makeSelectMoney,
  makeSelectKaalixLoyaltyMsg,
  makeSelectKaalixPoints,
  makeSelectCard,
  makeSelectCardMsg,
};
