import produce from 'immer';

import { SET_LOCALE, CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from 'locales';

export const initialState = {
  locale: DEFAULT_LOCALE,
};

/* tslint-disable default-case, no-param-reassign */
const languageProviderReducer = produce((draft, action) => {
  switch (action.type) {
    // case CHANGE_LOCALE:
    //   draft.locale = action.locale;
    //   break;
    case SET_LOCALE:
      draft.locale = action.locale;
      break;
  }
}, initialState);

export default languageProviderReducer;
