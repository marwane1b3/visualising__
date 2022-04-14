import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cardList state domain
 */

const selectCardListDomain = (state: any) => state.cardList || initialState;
const makeSelectLoadingScreen = createSelector(
  selectCardListDomain,
  (substate) => substate.loading,
);
const makeSelectErrorScreen = createSelector(
  selectCardListDomain,
  (substate) => substate.error,
);
const makeSelectCardListScreen = createSelector(
  selectCardListDomain,
  (substate) => substate.cardList,
);
const makeSelectCardSelectedScreen = createSelector(
  selectCardListDomain,
  (substate) => substate.selectedCard,
);

const makeSelectPaymentUrl = createSelector(
    selectCardListDomain,
    (substate) => substate.paymentUrl,
);

const makeSelectCardList = () =>
  createSelector(selectCardListDomain, (substate) => substate);

export default makeSelectCardList;
export {
  selectCardListDomain,
  makeSelectLoadingScreen,
  makeSelectErrorScreen,
  makeSelectCardListScreen,
  makeSelectCardSelectedScreen,
  makeSelectPaymentUrl,
};
