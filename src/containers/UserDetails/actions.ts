/*
 *
 * UserDetails actions
 *
 */

import {
  SET_USER_DETAILS,
  //
  CLEAR_USER_DETAILS,
  //
  GET_USER_DETAILS,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_ERROR,
} from './constants';

export const setUserDetailsAction = (userDetails: object) => ({
  type: SET_USER_DETAILS,
  userDetails,
});

export const clearUserDetailsAction = () => ({ type: CLEAR_USER_DETAILS });

export const getUserDetailsAction = (token: string | null) => ({
  type: GET_USER_DETAILS,
  token,
});
export const getUserDetailsSuccessAction = (data: object) => ({
  type: GET_USER_DETAILS_SUCCESS,
  data,
});
export const getUserDetailsErrorAction = (error: object) => ({
  type: GET_USER_DETAILS_ERROR,
  error,
});
