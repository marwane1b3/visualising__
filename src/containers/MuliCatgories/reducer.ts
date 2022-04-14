import produce from 'immer';
import {
  REQUEST_MORE_SINGLE_CATEGORY,
  SET_MORE_SINGLE_CATEGORY,
  SET_TAGS_LIST,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  filterNames: [],
  tagList: [],
};
const MultiCategoryMoreReducer = produce((draft, action) => {
  switch (action.type) {
    case REQUEST_MORE_SINGLE_CATEGORY:
      draft.loading = true;
      draft.error = false;
      break;
    case SET_MORE_SINGLE_CATEGORY:
      draft.loading = false;
      draft.error = false;
      draft.filterNames = action.categoryName;
      break;
    case SET_TAGS_LIST:
      draft.tagList = action.tagList;
      break;
  }
}, initialState);

export default MultiCategoryMoreReducer;
