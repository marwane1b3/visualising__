/*
 *
 * AdBannierContainer reducer
 *
 */

import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_PUB_GROUPS_ACTION,
  GET_PUB_GROUPS_ACTION_SUCCESS,
  GET_PUB_GROUPS_FAIL,
  GET_PUB_GROUPS_ACTION_SUCCESS_BANNER,
  GET_PUB_GROUPS_ACTION_SUCCESS_TABS,
} from './constants';

export const initialState = {
  error: false,
  errorMsg: '',
  loading: false,
  publicityGroups: [],
  tabs: {},
  banner: {},
  serviceId: '',
};

/* eslint-disable default-case, no-param-reassign */
const adBannierContainerReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_PUB_GROUPS_ACTION:
      draft.error = false;
      draft.errorMsg = '';
      draft.loading = true;
      draft.serviceId = action.serviceId ? action.serviceId : '';
      break;
    case GET_PUB_GROUPS_ACTION_SUCCESS:
      draft.error = false;
      draft.loading = false;
      draft.errorMsg = '';
      draft.publicityGroups = action.publicityGroups;
      break;
    case GET_PUB_GROUPS_ACTION_SUCCESS_BANNER:
      draft.error = false;
      draft.loading = false;
      draft.errorMsg = '';
      draft.banner = action.banner;
      break;
    case GET_PUB_GROUPS_ACTION_SUCCESS_TABS:
      draft.error = false;
      draft.loading = false;
      draft.errorMsg = '';
      draft.tabs = action.tabs;
      break;
    case GET_PUB_GROUPS_FAIL:
      draft.error = true;
      draft.errorMsg = action.error;
      draft.loading = false;
      break;
  }
}, initialState);

export default adBannierContainerReducer;
