import {
  REQUEST_MORE_SINGLE_CATEGORY,
  SET_MORE_SINGLE_CATEGORY,
  SET_TAGS_LIST,
} from './constants';

export function requestMoreSingleCategory() {
  return {
    type: REQUEST_MORE_SINGLE_CATEGORY,
  };
}

export function setMoreSingleCategory(catName: any) {
  return {
    type: SET_MORE_SINGLE_CATEGORY,
    categoryName: catName,
  };
}
export function setTagList(tagList: Array<object>) {
  return {
    type: SET_TAGS_LIST,
    tagList: tagList,
  };
}
