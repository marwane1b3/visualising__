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
  SET_TEXT_ACTION,
} from './constants';

export const initialState = {
  audioPath: '',
  photoArray: [],
  showMap: false,
  term: '',
};

/* eslint-disable default-case, no-param-reassign */
const ChoubikScreenReducer = produce((draft, action) => {
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
    case SET_TEXT_ACTION:
      draft.term = action.term;
      break;
  }
}, initialState);

export default ChoubikScreenReducer;
