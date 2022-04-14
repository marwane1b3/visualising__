import produce from 'immer';
import { REQUEST_MULTI_TRI, SET_MULTI_TRI, SET_TRI_DATA } from './constants';

export const initialState = {
  loading: false,
  error: false,
  selectedTriNames: [],
  triNames: [],
};
const MultiTriReducer = produce((draft, action) => {
  switch (action.type) {
    case REQUEST_MULTI_TRI:
      draft.loading = true;
      draft.error = false;
      break;
    case SET_MULTI_TRI:
      draft.loading = false;
      draft.error = false;
      draft.selectedTriNames = action.selectedTriNames;
      break;
    case SET_TRI_DATA:
      draft.loading = false;
      draft.error = false;
      draft.triNames = action.triNames;
      break;
  }
}, initialState);

export default MultiTriReducer;
