import {
  SET_AUDIO_OBJECT_ACTION,
  SET_PHOTO_PATH_ACTION,
  GET_MAP_ACTION,
  SET_TEXT_ACTION,
  SET_MORE_DESTINATIONS_ACTION,
  SET_DESTINATION_ADDRESS,
  GET_DATE_ACTION,
  GET_MODAL_SHOW_ACTION,
  GET_TIME_DELIVERY_OPTION_ACTION,
  SET_TIME_DELIVERY_OPTION,
  selectedTimeOption,
} from './constants';

export function setAudioAction(
  audioPath: any,
  isPickup: boolean,
  index: number,
) {
  return {
    type: SET_AUDIO_OBJECT_ACTION,
    audioPath,
    isPickup,
    index,
  };
}
export function setTextAction(comment: any, isPickup: boolean, index: number) {
  return {
    type: SET_TEXT_ACTION,
    comment,
    isPickup,
    index,
  };
}

export function setPhotoAction(
  photoArray: any,
  isPickup: boolean,
  index: number,
) {
  return {
    type: SET_PHOTO_PATH_ACTION,
    photoArray,
    isPickup,
    index,
  };
}

export function getMapAction(flag: boolean) {
  return {
    type: GET_MAP_ACTION,
    flag,
  };
}

export function setDestinationsAction(destinations: any, index?: number) {
  return {
    type: SET_MORE_DESTINATIONS_ACTION,
    destinations,
    index,
  };
}

export function setDestinationAddress(address: any, index: number) {
  return {
    type: SET_DESTINATION_ADDRESS,
    address,
    index,
  };
}

export function requestTimeDeliveryOptionAction() {
  return {
    type: GET_TIME_DELIVERY_OPTION_ACTION,
  };
}

export function setTimeDeliveryOption(DeliveryTimeOptions: any) {
  return {
    type: SET_TIME_DELIVERY_OPTION,
    DeliveryTimeOptions,
  };
}

export function getDateAction(date: any) {
  return {
    type: GET_DATE_ACTION,
    date,
  };
}

// export function getModalShowAction(showFlag: boolean) {
//   return {
//     type: GET_MODAL_SHOW_ACTION,
//     showFlag,
//   };
// }
