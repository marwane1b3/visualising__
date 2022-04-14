// import { AnyAction } from 'redux';
// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { REQUEST_RES_LIST } from './constants';
// import { requestResLisSuccess, requestResListFail } from './actions';

// function parseJSON(response: any) {
//   if (response.status === 204 || response.status === 205) {
//     return null;
//   }
//   return response.json();
// }

// function checkStatus(response: any) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const error: any = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }

// function request(url: string, options: object) {
//   return fetch(url, options).then(checkStatus).then(parseJSON);
// }

// export function* getList() {
//   try {
//     const requestURL = `https://api.kaalix.com/api/user/get_store_list_from_admin_categories_new`;

//     const list = yield call(request, requestURL, {
//       method: 'POST',
//       body: JSON.stringify({
//         city_id: '5cd434fbf4ce865beeda7757',
//         latitude: 33.57827466443387,
//         longitude: -7.640585359185934,
//         admin_sub_category_id: '5f2a8e61785dd94597d6114e',
//         admin_category_id: '5f2a91df785dd94597d61155',
//         new_version: true,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (list.success) {
//       // console.log(list);
//       yield put(requestResLisSuccess(list));
//     }else{
//       yield put(requestResListFail("no succes")) ;
//     }
//   } catch (err) {
//     console.log(err);
//     yield put(requestResListFail(err.message));
//   }
// }

// // Individual exports for testing
// export default function* storesListScreenSaga() {
//   // See example in containers/HomePage/saga.js
//   yield takeLatest(REQUEST_RES_LIST, getList);
// }
