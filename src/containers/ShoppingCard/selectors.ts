import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the shoppingCard state domain
 */

const selectShoppingCardDomain = (state: any) =>
  state.shoppingCard || initialState;

/**
 * Other specific selectors
 */

const makeSelectItems = createSelector(
  selectShoppingCardDomain,
  (substate) => substate.items,
);
const makeSelectProducts = createSelector(
  selectShoppingCardDomain,
  (substate) => substate.products,
);
const makeSelectorderPrice = createSelector(
  selectShoppingCardDomain,
  (substate) => substate.orderPrice,
);
const makeSelectSelectedStore = createSelector(
  selectShoppingCardDomain,
  (substate) => substate.selectedStore,
);

/**
 * Default selector used by ShoppingCard
 */

const makeSelectShoppingCard = () =>
  createSelector(selectShoppingCardDomain, (substate) => substate);

export default makeSelectShoppingCard;
export {
  selectShoppingCardDomain,
  makeSelectItems,
  makeSelectProducts,
  makeSelectorderPrice,
  makeSelectSelectedStore,
};
