/*
 *
 * ReclamationContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_DESCRIPTION_ACTION,
  SET_RECLAMATION_BODY_ACTION,
  SET_RECLAMATION_BODY_ACTION_FAIL,
  SET_RECLAMATION_BODY_ACTION_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setDesriptionAction(description: string) {
  return {
    type: SET_DESCRIPTION_ACTION,
    description,
  };
}

export function setReclamationBodyAction(body: object) {
  return {
    type: SET_RECLAMATION_BODY_ACTION,
    body,
  };
}

export function setReclamationBodySuccessAction(response: any) {
  return {
    type: SET_RECLAMATION_BODY_ACTION_SUCCESS,
    response,
  };
}
export function setReclamationBodyFailAction(error: any) {
  return {
    type: SET_RECLAMATION_BODY_ACTION_FAIL,
    error,
  };
}
