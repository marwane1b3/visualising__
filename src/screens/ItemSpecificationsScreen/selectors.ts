import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itemSpecificationsScreen state domain
 */

const selectItemSpecificationsScreenDomain = (state: any) =>
  state.itemSpecificationsScreen || initialState;

/**
 * Other specific selectors
 */

 const makeSelectItemSpecData = createSelector(
  selectItemSpecificationsScreenDomain,
  (substate) => substate.itemSpecifications,
);
 const makeSelectSpecifications= createSelector(
   selectItemSpecificationsScreenDomain,
   (substate) => substate.specifications,
 );
const makeSelectItemSpecLoading = createSelector(
  selectItemSpecificationsScreenDomain,
  (substate) => substate.loading,
);
const makeSelectItemSpecError = createSelector(
  selectItemSpecificationsScreenDomain,
  (substate) => substate.error,
);
const makeSelectItemAndSpecificationsPrice = createSelector(
  selectItemSpecificationsScreenDomain,
  (substate) => substate.itemAndSpecificationsPrice,
);
const makeSelectItemQuantity = createSelector(
  selectItemSpecificationsScreenDomain,
  (substate) => substate.quantity,
);
const makeSelectReducedSpecs = createSelector(
  selectItemSpecificationsScreenDomain,
  (substate) => substate.reducedSpecs,
);


/**
 * Default selector used by ItemSpecificationsScreen
 */

const makeSelectItemSpecificationsScreen = () =>
  createSelector(selectItemSpecificationsScreenDomain, (substate) => substate);

export default makeSelectItemSpecificationsScreen;
export {
  selectItemSpecificationsScreenDomain,
  makeSelectItemSpecData,
  makeSelectSpecifications,
  makeSelectItemSpecLoading,
  makeSelectItemSpecError,
  makeSelectItemAndSpecificationsPrice,
  makeSelectItemQuantity,
  makeSelectReducedSpecs,
};
