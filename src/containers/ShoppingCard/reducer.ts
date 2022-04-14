/*
 *
 * ShoppingCard reducer
 *
 */

import produce from 'immer';
import {
  ADD_ITEM,
  MINUS_QUANTITY,
  PLUS_QUANTITY,
  REHYDRATE_STORE,
  CLEAR_CARD,
  SET_SELECTED_STORE,
} from './constants';

export const initialState = {
  items: [],
  products: [],
  orderPrice: 0,
  selectedStore: null,
};

const calculatePrices = (products: any) => {
  let orderPrice = 0;
  products.forEach((product: any) => {
    product.items.forEach((item: any) => {
      let itemPrice = item.itemPrice;
      let specificationPrice = 0;
      // let itemTotalPrice = 0;
      item.specifications.forEach((specification: any) => {
        specification.list.forEach((specItem: any) => {
          if (specItem.selected) {
            if (specification.priceconfig === 'add')
              specificationPrice += specItem.price;
            else if (specification.priceconfig === 'override')
              itemPrice = specItem.price;
          }
        });
      });
      item.itemPrice = itemPrice;
      item.specificationPrice = specificationPrice;
      item.itemTotalPrice = itemPrice + specificationPrice;
      orderPrice += item.itemTotalPrice * item.quantity;
    });
  });
  console.log(orderPrice);
  return orderPrice;
};
/* eslint-disable default-case, no-param-reassign */
const shoppingCardReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_SELECTED_STORE:
      draft.selectedStore = action.store;
      break;
    case PLUS_QUANTITY:
      draft.products = draft.products.map((product: any) => {
        return product.productId == action.productId
          ? {
              ...product,
              items: product.items.map((item: any) => {
                return item.itemId == action.item.itemId &&
                  item.reducedSpecs == action.item.reducedSpecs
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item;
              }),
            }
          : product;
      });
      draft.orderPrice = calculatePrices(draft.products);
      break;
    case MINUS_QUANTITY:
      let tmpProducts = draft.products.map((product: any) => {
        return product.productId == action.productId
          ? {
              ...product,
              items: product.items.map((item: any) => {
                return item.itemId == action.item.itemId &&
                  item.reducedSpecs == action.item.reducedSpecs
                  ? {
                      ...item,
                      quantity: item.quantity - 1,
                    }
                  : item;
              }),
            }
          : product;
      });
      draft.products = tmpProducts
        .map((product: any) => {
          return {
            ...product,
            items: product.items.filter((item: any) => item.quantity > 0),
          };
        })
        .filter((product: any) => {
          return product.items.length > 0;
        });
      draft.orderPrice = calculatePrices(draft.products);
      break;
    case ADD_ITEM:
      console.log('from cart reducer : ', action.item);

      let products = draft.products;
      let itemToAdd = action.itemToAdd;
      // {
      //   itemId: action.item._id,
      //   quantity: 1,
      //   name: action.item.name,
      //   specificationPrice: 0,
      //   itemPrice: action.item.price,
      //   itemTotalPrice: action.item.price,
      //   reducedSpecs: "",
      //   specifications: [],
      // };
      let productIndex = products.findIndex(
        (p: any) => p.productId == action.product._id,
      );
      if (productIndex == -1) {
        products.push({
          productId: action.product._id,
          name: action.product.name,
          items: [itemToAdd],
        });
      } else {
        let itemIndex = products[productIndex].items.findIndex(
          (i: any) =>
            i.itemId == itemToAdd.itemId &&
            i.reducedSpecs == itemToAdd.reducedSpecs,
        );
        if (itemIndex == -1) {
          console.log('ADDED 11111', itemToAdd.reducedSpecs);
          products[productIndex].items.push(itemToAdd);
        } else {
          console.log(
            'ADDED 222222',
            itemToAdd.reducedSpecs,
            products[productIndex].items[itemIndex].quantity,
            '+=',
            itemToAdd.quantity,
          );
          products[productIndex].items[itemIndex].quantity +=
            itemToAdd.quantity;
        }
      }
      draft.products = products;
      draft.orderPrice = calculatePrices(products);
      break;
    case CLEAR_CARD:
      draft.items = [];
      draft.products = [];
      draft.orderPrice = 0;
      break;

    case REHYDRATE_STORE:
      Object.keys(action.store).forEach((key) => {
        draft[key] = action.store[key];
      });
      break;
  }
}, initialState);

export default shoppingCardReducer;
