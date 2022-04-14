/*
 *
 * ItemSpecificationsScreen actions
 *
 */

import {
  GET_ITEM_SPECIFICATIONS,
  GET_ITEM_SPECIFICATIONS_SUCCESS,
  GET_ITEM_SPECIFICATIONS_FAIL,
  SET_SPECIFICATION_CHOICE_SELECTED,
  SET_SPECIFICATION_OPEN,
  SET_QUANTITY,
} from './constants';


export const setSpecificationOpen = (specIndex: number) => ({
  type: SET_SPECIFICATION_OPEN,
  specIndex,
})


export const setSpecificationChoiceSelected = (
  specIndex: number,
  specChoiceIndex: number,
) => ({
  type: SET_SPECIFICATION_CHOICE_SELECTED,
  specIndex,
  specChoiceIndex,
});

export const setQuantity = (quantity: number) => ({
  type: SET_QUANTITY,
  quantity,
});

export const getItemSpecificationsAction = (payload: string | null) => ({
  type: GET_ITEM_SPECIFICATIONS,
  payload,
}

);
export const getItemSpecificationsSuccessAction = (data: object) => ({
  type: GET_ITEM_SPECIFICATIONS_SUCCESS,
  data,
});
export const getItemSpecificationsErrorAction = (error: object) => ({
  type: GET_ITEM_SPECIFICATIONS_FAIL,
  error,
});