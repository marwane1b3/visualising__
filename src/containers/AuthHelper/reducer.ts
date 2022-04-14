/*
 *
 * AuthHelper reducer
 *
 */

import produce from 'immer';
import { date, object } from 'yup/lib/locale';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  //
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
} from './constants';

export const initialState = {
  registerLoading: false,
  registerError: false,
  registerPayload: {},
  //
  signinLoading: false,
  signinError: false,
  signinPayload: {},
};

/* eslint-disable default-case, no-param-reassign */
const authHelperReducer = produce((draft, action) => {
  switch (action.type) {
    case REGISTER:
      draft.registerLoading = true;
      draft.registerError = false;
      break;
    case REGISTER_SUCCESS:
      draft.registerPayload = {};
      draft.registerLoading = false;
      draft.registerError = false;
      break;
    case REGISTER_ERROR:
      draft.registerLoading = false;
      draft.registerError = action.error;
      break;
    case SIGN_IN:
      draft.signinLoading = true;
      draft.signinError = false;
      break;
    case SIGN_IN_SUCCESS:
      draft.user = action.user;
      draft.signinPayload = {};
      draft.signinLoading = false;
      draft.signinError = false;
      break;
    case SIGN_IN_ERROR:
      draft.signinLoading = false;
      draft.signinError = action.error;
      break;
    default:
      break;
  }
}, initialState);

export default authHelperReducer;
