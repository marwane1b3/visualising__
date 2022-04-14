/*
 *
 * UserDetails constants
 *
 */

export const scope = 'app/container/UserDetails';

export const WEB_SERVICE = {
  GET_USER_DETAILS: '/oauth/token',
};

export const WEB_SERVICE_VARS = {
  REFRESH_TOKEN: 'refresh_token',
};

export const SET_USER_DETAILS = `${scope}/SET_USER_DETAILS`;

export const CLEAR_USER_DETAILS = `${scope}/CLEAR_USER_DETAILS`;

export const GET_USER_DETAILS = `${scope}/CLEAR_USER_DETAILS`;
export const GET_USER_DETAILS_SUCCESS = `${scope}/CLEAR_USER_DETAILS_SUCCESS`;
export const GET_USER_DETAILS_ERROR = `${scope}/CLEAR_USER_DETAILS_ERROR`;
