/*
 *
 * AdBannierContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_PUB_GROUPS_ACTION,
  GET_PUB_GROUPS_ACTION_SUCCESS,
  GET_PUB_GROUPS_FAIL,
  GET_PUB_GROUPS_ACTION_SUCCESS_BANNER,
  GET_PUB_GROUPS_ACTION_SUCCESS_TABS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getPubGroupsAction(serviceId?: string) {
  return {
    type: GET_PUB_GROUPS_ACTION,
    serviceId,
  };
}

export function getPubGroupsActionSuccess(publicityGroups: object[]) {
  return {
    type: GET_PUB_GROUPS_ACTION_SUCCESS,
    publicityGroups,
  };
}

export function getPubGroupsActionSuccessTabs(tabs: object) {
  return {
    type: GET_PUB_GROUPS_ACTION_SUCCESS_TABS,
    tabs,
  };
}
export function getPubGroupsActionSuccessBanner(banner: object) {
  return {
    type: GET_PUB_GROUPS_ACTION_SUCCESS_BANNER,
    banner,
  };
}

export function getPubGroupsActionFail(error: string) {
  return {
    type: GET_PUB_GROUPS_FAIL,
    error,
  };
}
