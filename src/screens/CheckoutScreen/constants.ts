/*
 *
 * CheckoutScreen constants
 *
 */
export const selectedTimeOption = [
  { name: 'Maintenant', isSelect: true },
  { name: 'Planifier', isSelect: false },
];
interface deliveryPriceAPIPayload {
  cityId?: string;
  storeId?: string;
}
export const WEB_SERVICE = {
  GET_CARDS: '/card',
  ADD_CARD: '/card/add',
  SELECTED_CARD: '/card/selected',
  PAYMENT: '/payment',
  UPDATE_PAYMENT: (paymentId: string) => `/payment/${paymentId}`,
  DELIVERY_PRICE: ({ cityId, storeId }: deliveryPriceAPIPayload) =>
    `/delivery_price/city/${cityId}/store/${storeId}`,
  CREEATE_ORDER: '/order',
};

export const DEFAULT_ACTION = 'app/CheckoutScreen/DEFAULT_ACTION';
//
export const CREATE_PAYMENT = 'app/CheckoutScreen/CREATE_PAYMENT';
export const CREATE_PAYMENT_SUCCESS =
  'app/CheckoutScreen/CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_ERROR = 'app/CheckoutScreen/CREATE_PAYMENT_ERROR';
//
export const UPDATE_PAYMENT = 'app/CheckoutScreen/UPDATE_PAYMENT';
export const UPDATE_PAYMENT_SUCCESS =
  'app/CheckoutScreen/UPDATE_PAYMENT_SUCCESS';
export const UPDATE_PAYMENT_ERROR = 'app/CheckoutScreen/UPDATE_PAYMENT_ERROR';
//
export const CREATE_ORDER = 'app/CheckoutScreen/CREATE_ORDER';
export const CREATE_ORDER_SUCCESS = 'app/CheckoutScreen/CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'app/CheckoutScreen/CREATE_ORDER_ERROR';
//
export const GET_CARDS = 'app/CheckoutScreen/GET_CARDS';
export const GET_CARDS_SUCCESS = 'app/CheckoutScreen/GET_CARDS_SUCCESS';
export const GET_CARDS_ERROR = 'app/CheckoutScreen/GET_CARDS_ERROR';
//
export const GET_DATE_ACTION = 'app/CheckoutScreen/GET_DATE_ACTION';
export const GET_TIME_DELIVERY_OPTION_ACTION =
  'app/CheckoutScreen/GET_TIME_DELIVERY_OPTION_ACTION';
export const SET_TIME_DELIVERY_OPTION =
  'app/CheckoutScreen/SET_TIME_DELIVERY_OPTION';
//
export const GET_DELIVERY_PRICE = 'app/CheckoutScreen/GET_DELIVERY_PRICE';
export const GET_DELIVERY_PRICE_SUCCESS =
  'app/CheckoutScreen/GET_DELIVERY_PRICE_SUCCESS';
export const GET_DELIVERY_PRICE_ERROR =
  'app/CheckoutScreen/GET_DELIVERY_PRICE_ERROR';
//
export const CLEAN_UP_CHECKOUT_PAYMENT =
  'app/CheckoutScreen/CLEAN_UP_CHECKOUT_PAYMENT';

//
export const DEFAULT_CART_DETAIL = [
  {
    productId: '60bf55a312702365994067e6',
    name: 'Menus',
    items: [
      {
        itemId: '60bf561812702365994067e7',
        quantity: 2,
        name: 'Best Of Big Mac',
        specificationPrice: 0,
        itemPrice: 0,
        itemTotalPrice: 0,
        specifications: [
          {
            name: 'Select an option',
            priceconfig: 'override',
            type: 'single',
            list: [
              {
                selected: false,
                price: 50,
                name: 'Best Of',
              },
              {
                selected: true,
                price: 60,
                name: 'Maxi Best Of',
              },
            ],
          },
          {
            name: 'Add a drink',
            priceconfig: 'add',
            type: 'multiple',
            list: [
              {
                selected: true,
                price: 7,
                name: 'Pepsi',
              },
              {
                selected: true,
                price: 8,
                name: 'Coca Cola',
              },
              {
                selected: false,
                price: 8,
                name: 'Hawai',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getDistanceFromLatLonInKm = (latLong1: any, latLong2: any) => {
  const lat1 = latLong1[0]
  const lon1 = latLong1[1]
  const lat2 = latLong2[0]
  const lon2 = latLong2[1]
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
