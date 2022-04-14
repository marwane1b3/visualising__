import produce from 'immer';

import { CHANGE_THEME } from './constants';
import { DEFAULT_THEME } from 'theme';

export const initialState = {
  theme: DEFAULT_THEME,
};

/* tslint-disable default-case, no-param-reassign */
const themeProviderReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      draft.theme = action.theme;
      break;
  }
}, initialState);

export default themeProviderReducer;
