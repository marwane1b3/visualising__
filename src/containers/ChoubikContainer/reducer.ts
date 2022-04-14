/*
 *
 * Choubik container
 *
 */

import produce from 'immer';
import {
  SET_AUDIO_OBJECT_ACTION,
  SET_PHOTO_PATH_ACTION,
  GET_MAP_ACTION,
} from './constants';

export const initialState = {
  audioPath: '',
  photoArray: [],
  showMap: false,
};

/* eslint-disable default-case, no-param-reassign */
const choubikContainerReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_AUDIO_OBJECT_ACTION:
      draft.audioPath = action.audioPath;
      break;
    case SET_PHOTO_PATH_ACTION:
      draft.photoArray = action.photoArray;
      break;
    case GET_MAP_ACTION:
      draft.showMap = action.flag;
      break;
  }
}, initialState);

export default choubikContainerReducer;
