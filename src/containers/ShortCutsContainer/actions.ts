import {
  GET_SERVICES_CONTAINER_FAIL,
  GET_SERVICES_CONTAINER_REQUEST,
  GET_SERVICES_CONTAINER_SUCCESS,
} from './constants';

export function requestListServices() {
  return {
    type: GET_SERVICES_CONTAINER_REQUEST,
  };
}

export function getListServices(data: any) {
  return {
    type: GET_SERVICES_CONTAINER_SUCCESS,
    services: data,
  };
}

export function abortListServices(error: any) {
  return {
    type: GET_SERVICES_CONTAINER_FAIL,
    error: error,
  };
}
