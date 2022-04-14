/*
 *
 * ItemSpecificationsScreen reducer
 *
 */

import produce from 'immer';

import {
  GET_ITEM_SPECIFICATIONS,
  GET_ITEM_SPECIFICATIONS_SUCCESS,
  GET_ITEM_SPECIFICATIONS_FAIL,
  SET_SPECIFICATION_CHOICE_SELECTED,
  SET_SPECIFICATION_OPEN,
  SET_QUANTITY,
} from './constants';

export const initialState = {
  itemSpecifications: {},
  specifications: [],
  itemAndSpecificationsPrice: 0,
  quantity: 1,
  reducedSpecs: "",
  loading: false,
  error: false,
};

const calculatePrices = (
  item: any,
  specifications: any,
  quantity: number = 1,
) => {
  let totalPrice = 0;
  let itemPrice = item.price;
  let specificationPrice = 0;
  specifications.forEach((specification: any) => {
    specification.list.forEach((specItem: any) => {
      if (specItem.selected) {
        if (specification.priceconfig === 'add')
          specificationPrice += specItem.price;
        else if (specification.priceconfig === 'override')
          itemPrice = specItem.price;
      }
    });
  });
  totalPrice = (itemPrice + specificationPrice) * quantity;
  // console.log(totalPrice,itemPrice, specificationPrice, quantity);
  return totalPrice;
};

const getreducedSpecs =(  specifications: any,
) => {
  let reducedSpecs = ""
   specifications.forEach((specification: any) => {
     specification.list.forEach((specItem: any) => {
       if (specItem.selected) {
         reducedSpecs +=
           reducedSpecs === '' ? specItem.name : ' ,' + specItem.name;
       }
     });
   });
   return reducedSpecs;
  }

/* eslint-disable default-case, no-param-reassign */
const itemSpecificationsScreenReducer = produce((draft, action) => {
  let item = draft.itemSpecifications;
  let specifications = draft.specifications;
  let quantity = draft.quantity;

  switch (action.type) {
    case GET_ITEM_SPECIFICATIONS:
      draft.loading = true;
      draft.error = false;
      break;
    case GET_ITEM_SPECIFICATIONS_SUCCESS:
      item = action?.data.item;
      specifications = action?.data.item.specifications.map(
        (s: any, index: number) => {
          //TODO: Remove maxChoices Once get by
          return {
            ...s,
            // open: index % 2 == 0,
            maxChoices: s.maxChoices
              ? s.maxChoices
              : s.type == 'single'
              ? 1
              : 2,
            open: true,
            list: s.list.map((ch: any) => {
              return { ...ch, selected: ch.defaultselected };
            }),
          };
        },
      );
      draft.loading = false;
      draft.itemSpecifications = item;
      draft.specifications = specifications;
      break;
    case GET_ITEM_SPECIFICATIONS_FAIL:
      draft.loading = false;
      draft.error = action.error;
      break;

    case SET_SPECIFICATION_OPEN:
      specifications = draft.specifications.map(
        (spec: any, specIndex: number) => {
          return {
            ...spec,
            open: specIndex === action.specIndex ? !spec.open : spec.open,
          };
        },
      );
      draft.specifications = specifications;
      break;

    case SET_SPECIFICATION_CHOICE_SELECTED:
      specifications = draft.specifications.map(
        (spec: any, specIndex: number) => {
          return {
            ...spec,
            list:
              specIndex === action.specIndex
                ? spec.list.map((specChoice: any, specChoiceIndex: number) => {
                    return specChoiceIndex === action.specChoiceIndex
                      ? {
                          ...specChoice,
                          selected: !specChoice.selected,
                        }
                      : specChoice;
                  })
                : spec.list,
          };
        },
      );
      draft.specifications = specifications;
      break;
    case SET_QUANTITY:
      quantity = action.quantity;
      draft.quantity = quantity;
      break;
  }
  draft.reducedSpecs = getreducedSpecs(specifications);
  draft.itemAndSpecificationsPrice = calculatePrices(
    item,
    specifications,
    quantity,
  );
}, initialState);

export default itemSpecificationsScreenReducer;
