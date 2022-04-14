/*
 *
 * StoresListContainer reducer
 *
 */

import produce from 'immer';
import {
  // REQUEST_CAT_LIST,
  // REQUEST_CAT_LIST_SUCCESS,
  // REQUEST_CAT_LIST_FAILED,
  // REQUEST_CAT_LIST_FILTERED,
  // REQUEST_CAT_LIST_RESTRICTED,
  SET_TAGS_LIST,
  CHANGE_TAG_SELECT
} from './constants';

export const initialState = {
  tagList: [],
  sortBy: "", // Price, Time, Distance, NbPoints
  promoType: [],
};

/* eslint-disable default-case, no-param-reassign */
const storesListContainerReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_TAGS_LIST:
      draft.tagList = action.tagList;
      break;
    case CHANGE_TAG_SELECT:
      draft.tagList = draft.tagList.map(
        (tag: { _id: string; isSelect: boolean }) =>
          tag._id == action.tag._id ? { ...tag, isSelect: !tag.isSelect } : tag,
      );
      break;
  }
}, initialState);

export default storesListContainerReducer;
