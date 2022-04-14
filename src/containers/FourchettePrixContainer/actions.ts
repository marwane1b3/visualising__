import { REQUEST_MULTI_TRI, SET_MULTI_TRI, SET_TRI_DATA } from './constants';

export function requestMultiTriAction() {
  return {
    type: REQUEST_MULTI_TRI,
  };
}

export function setMUltiTriAction(selectedTriNames: any) {
  return {
    type: SET_MULTI_TRI,
    selectedTriNames,
  };
}
export function setMultiData(triNames: any) {
  return {
    type: SET_TRI_DATA,
    triNames,
  };
}
