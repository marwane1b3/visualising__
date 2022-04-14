import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the checkoutScreen state domain
 */

const selectCheckoutScreenDomain = (state: any) =>
  state.checkoutScreen || initialState;

/**
 * Other specific selectors
 */
const makeSelectPaymentDetailScreen = createSelector(
  selectCheckoutScreenDomain,
  (substate) => substate.paymentDetail,
);
const makeSelectLoadingScreen = createSelector(
  selectCheckoutScreenDomain,
  (substate) => substate.loading,
);
const makeSelectErrorScreen = createSelector(
  selectCheckoutScreenDomain,
  (substate) => substate.error,
);
const makeSelectCardListScreen = createSelector(
  selectCheckoutScreenDomain,
  (substate) => substate.cardList,
);
const DeliveryTimeOptionsSelector = () =>
  createSelector(
    selectCheckoutScreenDomain,
    (substate) => substate.DeliveryTimeOptions,
  );
const makeSelectDeliveryPriceDetail = createSelector(
  selectCheckoutScreenDomain,
  (substate) => substate.deliveryPriceDetail,
);
const DateSelector = () =>
  createSelector(
    selectCheckoutScreenDomain,
    (substate) => substate.selectedDate,
  );

  const makeSelectcleanUpAndGobackToHome = createSelector(
    selectCheckoutScreenDomain,
    (substate) => substate.cleanUpAndGobackToHome,
  );
/**
 * Default selector used by CheckoutScreen
 */

const makeSelectCheckoutScreen = () =>
  createSelector(selectCheckoutScreenDomain, (substate) => substate);

export default makeSelectCheckoutScreen;
export {
  selectCheckoutScreenDomain,
  makeSelectPaymentDetailScreen,
  makeSelectLoadingScreen,
  makeSelectErrorScreen,
  makeSelectCardListScreen,
  DeliveryTimeOptionsSelector,
  DateSelector,
  makeSelectDeliveryPriceDetail,
  makeSelectcleanUpAndGobackToHome,
};
