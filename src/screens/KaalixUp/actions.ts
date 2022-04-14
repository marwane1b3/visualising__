/*
 *
 * KaalixUp actions
 *
 */

import { 
GET_USER_LOYALTY,
GET_USER_LOYALTY_FAIL,
GET_USER_LOYALTY_SUCCESS 
} from './constants';

export const getUserLoyaltyAction = (payload: string | null) => ({
  type: GET_USER_LOYALTY,
  payload,
}

);
export const getUserLoyaltySuccessAction = (data: object) => ({
  type: GET_USER_LOYALTY_SUCCESS,
  data,
});
export const getUserLoyaltyErrorAction = (error: object) => ({
  type: GET_USER_LOYALTY_FAIL,
  error,
});
