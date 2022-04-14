/*
 *
 * AuthHelper actions
 *
 */

import {
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
	//
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './constants';

export function registerAction(payload: object) {
  return { type: REGISTER, payload };
}
export function registerSuccessAction(user: object) {
  return { type: REGISTER_SUCCESS, user };
}
export function registerErrorAction(error: object) {
  return { type: REGISTER_ERROR, error };
}
//
export function signInAction(payload: object) {
  return {
    type: SIGN_IN,
    payload,
  };
}
export function signInSuccessAction(data: object) {
  return {
    type: SIGN_IN_SUCCESS,
    data,
  };
}
export function signInErrorAction(error: object) {
  return {
    type: SIGN_IN_ERROR,
    error,
  };
}
