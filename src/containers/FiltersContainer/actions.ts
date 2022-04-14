import {
  // REQUEST_CAT_LIST,
  // REQUEST_CAT_LIST_FAILED,
  // REQUEST_CAT_LIST_FILTERED,
  // REQUEST_CAT_LIST_SUCCESS,
  // REQUEST_CAT_LIST_RESTRICTED,
  SET_TAGS_LIST,
  CHANGE_TAG_SELECT,
} from './constants';

function setTagList(tagList: Array<object>) {
  return {
    type: SET_TAGS_LIST,
    tagList: tagList,
  };
}
function changeTagSelect(tag: object) {
  return {
    type: CHANGE_TAG_SELECT,
    tag: tag,
  };
}
// function getCategoriesListSuccess(data: any) {
//   return {
//     type: REQUEST_CAT_LIST_SUCCESS,
//     payload: data,
//   };
// }

// function getCategoriesListFail(msg: any) {
//   return {
//     type: REQUEST_CAT_LIST_FAILED,
//     error: msg,
//   };
// }

// function getSingleFilter(filteredCategory: any) {
//   return {
//     type: REQUEST_CAT_LIST_FILTERED,
//     FilteredCategory: filteredCategory,
//   };
// }
// function getRestrictedFilters(data: any) {
//   return {
//     type: REQUEST_CAT_LIST_RESTRICTED,
//     restricted_filters: data,
//   };
// }

export {
  // getCategoriesList,
  // getCategoriesListFail,
  // getSingleFilter,
  // getCategoriesListSuccess,
  // getRestrictedFilters,
  setTagList,
  changeTagSelect,
};
