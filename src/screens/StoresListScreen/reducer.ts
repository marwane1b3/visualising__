// /*
//  *
//  * StoresListScreen reducer
//  *
//  */

// import produce from 'immer';
// import {
//   REQUEST_RES_LIST,
//   REQUEST_RES_LIST_FAIL,
//   REQUEST_RES_LIST_SUCCESS,
// } from './constants';

// export const initialState = {
//   error: false,
//   loading: false,
//   payload: {},
// };

// /* eslint-disable default-case, no-param-reassign */
// const storesListScreenReducer = produce((draft, action) => {
//   switch (action.type) {
//     case REQUEST_RES_LIST:
//       draft.loading = true;
//       draft.error = false;
//       break;
//     case REQUEST_RES_LIST_SUCCESS:
//       draft.loading = false;
//       draft.error = false;
//       draft.payload = action.payload;
//       break;
//     case REQUEST_RES_LIST_FAIL:
//       draft.loading = false;
//       draft.error = action.payload;

//       break;
//   }
// }, initialState);

// export default storesListScreenReducer;
