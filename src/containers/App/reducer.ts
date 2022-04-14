import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

// The initial state of the App
export const initialState = {
  test: 'hhh',
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = produce((draft, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      break;
  }
}, initialState);

export default appReducer;
