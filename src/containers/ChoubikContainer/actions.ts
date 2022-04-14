import {
  SET_AUDIO_OBJECT_ACTION,
  SET_PHOTO_PATH_ACTION,
  GET_MAP_ACTION,
} from './constants';

export function setAudioAction(audioPath: any) {
  return {
    type: SET_AUDIO_OBJECT_ACTION,
    audioPath,
  };
}

export function setPhotoAction(photoArray: any) {
  return {
    type: SET_PHOTO_PATH_ACTION,
    photoArray,
  };
}

export function getMapAction(flag: boolean) {
  return {
    type: GET_MAP_ACTION,
    flag,
  };
}
