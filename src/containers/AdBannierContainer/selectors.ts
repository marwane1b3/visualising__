import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adBannierContainer state domain
 */

const selectAdBannierContainerDomain = (state: any) =>
  state.adBannierContainer || initialState;

/**
 * Other specific selectors
 */

const makeSelectLoadingPubState = () =>
  createSelector(
    selectAdBannierContainerDomain,
    (substate) => substate.loading,
  );
const makeSelectErrorPubState = () =>
  createSelector(selectAdBannierContainerDomain, (substate) => substate.error);

const makeSelectErrorPubMessage = () =>
  createSelector(
    selectAdBannierContainerDomain,
    (substate) => substate.errorMsg,
  );
const makeSelectpublicityGroupsState = () =>
  createSelector(
    selectAdBannierContainerDomain,
    (substate) => substate.publicityGroups,
  );

const makeSelectpublicityGroupTabsState = () =>
  createSelector(selectAdBannierContainerDomain, (substate) => substate.tabs);
const makeSelectpublicityGroupBannerState = () =>
  createSelector(selectAdBannierContainerDomain, (substate) => substate.banner);

const makeSelectServiceId = () =>
  createSelector(
    selectAdBannierContainerDomain,
    (substate) => substate.serviceId,
  );
/**
 * Default selector used by AdBannierContainer
 */

const makeSelectAdBannierContainer = () =>
  createSelector(selectAdBannierContainerDomain, (substate) => substate);

export default makeSelectAdBannierContainer;
export {
  selectAdBannierContainerDomain,
  makeSelectErrorPubMessage,
  makeSelectpublicityGroupsState,
  makeSelectErrorPubState,
  makeSelectLoadingPubState,
  makeSelectpublicityGroupBannerState,
  makeSelectpublicityGroupTabsState,
  makeSelectServiceId,
};
