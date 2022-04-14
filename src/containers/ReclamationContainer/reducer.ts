/*
 *
 * ReclamationContainer reducer
 *
 */

import produce from 'immer';
import {
  DEFAULT_ACTION,
  SET_DESCRIPTION_ACTION,
  SET_RECLAMATION_BODY_ACTION,
  SET_RECLAMATION_BODY_ACTION_FAIL,
  SET_RECLAMATION_BODY_ACTION_SUCCESS,
} from './constants';

export const initialState = {
  description: '',
  error: false,
  loading: false,
  response: '',
  body: {},
};

/* eslint-disable default-case, no-param-reassign */
const reclamationContainerReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_DESCRIPTION_ACTION:
      draft.loading = false;
      draft.error = false;
      draft.description = action.description;
      break;

    case SET_RECLAMATION_BODY_ACTION:
      draft.loading = true;
      draft.error = false;
      draft.body = action.body;
      break;
    case SET_RECLAMATION_BODY_ACTION_SUCCESS:
      draft.loading = false;
      draft.error = false;
      draft.response = action.response;
      break;
    case SET_RECLAMATION_BODY_ACTION_FAIL:
      draft.loading = false;
      draft.error = true;
      draft.response = action.error;
      break;
  }
}, initialState);

export default reclamationContainerReducer;
