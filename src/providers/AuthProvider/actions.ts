/*
 *
 * AuthProvider actions
 *
 */

import { SET_TOKEN, DELETE_TOKEN, REHYDRATE_TOKEN } from './constants';

export function setTokenAction(token: string) {
  return { type: SET_TOKEN, token };
}
export function deleteTokenAction() {
  return { type: DELETE_TOKEN };
}
export function rehydrateTokenAction() {
  return { type: REHYDRATE_TOKEN };
}

export function persistTokenAction(tokens: object) {
  return { type: REHYDRATE_TOKEN, tokens };
}
