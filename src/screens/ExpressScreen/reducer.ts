/*
 *
 *ExpressScreen
 *
 */

import produce from 'immer';
import {
  SET_AUDIO_OBJECT_ACTION,
  SET_PHOTO_PATH_ACTION,
  GET_MAP_ACTION,
  SET_TEXT_ACTION,
  SET_MORE_DESTINATIONS_ACTION,
  SET_DESTINATION_ADDRESS,
  SET_TIME_DELIVERY_OPTION,
  GET_TIME_DELIVERY_OPTION_ACTION,
  GET_MODAL_SHOW_ACTION,
  GET_DATE_ACTION,
} from './constants';

export const initialState = {
  PickupLocation: {
    isPickup: true,
    data: {
      audioPath: '',

      comment: '',
      photoArray: [],
      showMap: false,
      address: {
        address: '',
        details: '',
        location: [0, 0],
      },
      name: '',
      phone: '',
    },
  },
  DestinationLocations: [
    {
      isPickup: false,
      data: {
        audioPath: '',
        comment: '',
        photoArray: [],
        showMap: false,
        address: {
          address: 'new location',
          details: '',
          location: [0, 0],
        },
        name: '',
        phone: '',
      },
    },
  ],
  DeliveryTimeOptions: [],
  loading: false,
  selectedDate: '',
  showFlag: false,
};

/* eslint-disable default-case, no-param-reassign */
const ExpressScreenReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_AUDIO_OBJECT_ACTION:
      if (action.isPickup) {
        console.log('from action Destination', action.index);

        draft.PickupLocation.data.audioPath = action.audioPath;
      } else {
        console.log('from action Destination', action.index);

        draft.DestinationLocations[action.index].data.audioPath =
          action.audioPath;
      }

      //  draft.audioPath = action.audioPath;
      break;
    case SET_PHOTO_PATH_ACTION:
      if (action.isPickup) {
        draft.PickupLocation.data.photoArray = action.photoArray;
      } else {
        console.log('from action picture', action.index);

        draft.DestinationLocations[action.index].data.photoArray =
          action.photoArray;
      }
      break;
    case GET_MAP_ACTION:
      draft.showMap = action.flag;
      break;
    case SET_TEXT_ACTION:
      if (action.isPickup) {
        draft.PickupLocation.data.comment = action.comment;
      } else {
        draft.DestinationLocations[action.index].data.comment = action.comment;
      }
      break;
    case SET_MORE_DESTINATIONS_ACTION:
      if (action.index)
        draft.DestinationLocations[action.index] = action.destinations;
      else draft.DestinationLocations = action.destinations;

      break;

    case SET_DESTINATION_ADDRESS:
      draft.DestinationLocations[action.index].data.address = action.address;
      break;

    case GET_TIME_DELIVERY_OPTION_ACTION:
      draft.loading = true;
      break;
    case SET_TIME_DELIVERY_OPTION:
      draft.loading = false;
      draft.DeliveryTimeOptions = action.DeliveryTimeOptions;
      break;
    case GET_DATE_ACTION:
      draft.loading = false;
      draft.selectedDate = action.date;
      break;
    case GET_MODAL_SHOW_ACTION:
      draft.loading = false;
      draft.showFlag = action.showFlag;
  }
}, initialState);

export default ExpressScreenReducer;
