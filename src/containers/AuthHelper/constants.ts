/*
 *
 * AuthHelper constants
 *
 */

const scope = 'app/container/AuthHelper';

export const WEB_SERVICE = {
  SIGN_IN: '/oauth/token',
  REGISTER: '/auth/register',
};

export const WEB_SERVICE_VARS = {
  ENTITY_TYPE: 'customer',
};

export const SIGN_IN = `${scope}/SIGN_IN`;
export const SIGN_IN_SUCCESS = `${scope}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${scope}/SIGN_IN_ERROR`;
//
export const REGISTER = `${scope}/REGISTER`;
export const REGISTER_SUCCESS = `${scope}/REGISTER_SUCCESS`;
export const REGISTER_ERROR = `${scope}/REGISTER_ERROR`;