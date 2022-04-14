import produce from 'immer';
import {
  GET_SERVICES_CONTAINER_REQUEST,
  GET_SERVICES_CONTAINER_FAIL,
  GET_SERVICES_CONTAINER_SUCCESS,
} from './constants';

export const initialState = {
  error: false,
  loading: false,
  services: [],
};

/* eslint-disable default-case, no-param-reassign */
const servicesListReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_SERVICES_CONTAINER_REQUEST:
      draft.loading = true;
      draft.error = false;
      break;
    case GET_SERVICES_CONTAINER_FAIL:
      draft.loading = false;
      draft.error = false;
      draft.services = action.services;
      break;
    case GET_SERVICES_CONTAINER_SUCCESS:
      draft.loading = false;
      draft.error = true;

      break;
  }
}, initialState);

export default servicesListReducer;
