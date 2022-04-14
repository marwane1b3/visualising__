import { AnyAction } from 'redux';
import { takeLatest, take, call, put, select } from 'redux-saga/effects';
import { REQUEST_LIST_ITEMS } from './constants';
import { selectId } from 'containers/StoreListContainer/selectors';
import { selectStoreId } from './selectors';
import { AxiosRequestConfig } from 'axios';
import { MICROSERVICE_BASE_URL, request } from 'utils';
import {
  getListItems,
  getProductsList,
  getFullList,
  getListItemsFail,
} from './actions';

export function* fetchItemsList() {
  let id: any = yield select(selectId());
  if (!id) {
    id = yield select(selectStoreId());
  }
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `${MICROSERVICE_BASE_URL.CONTENT}/store/${id}/products`,
  };

  try {
    if (id) {
      const response: object = yield call(async () => {
        const { data } = await request(config);
        return data;
      });
      const { products }: any = response;
      if (products.length > 0) {
        yield put(getFullList(products));

        // let newProducts = products.map((a: any) => {
        //   return { ...a };
        // });
        // yield put(getListItems(newProducts));
        // // yield put(
        // //   getListItems(
        // //     newProducts.filter((a: any, index: number) => {
        // //       if (index === 0) {
        // //         return a.products[0];
        // //       }
        // //     }),
        // //   ),
        // // );
        // const productNames = products.map((a: any, index: number) => {
        //   if (index === 0) {
        //     return { name: a.products[0].product.name, isSelect: true };
        //   } else return { name: a.products[0].product.name, isSelect: false };
        // });

        // yield put(getProductsList(productNames));
      }
    } else {
      yield put(getListItemsFail('api was fired before id selection'));
    }
  } catch (error) {
    yield put(getListItemsFail(error));
  }
}

// Individual exports for testing
export default function* itemsListScreenSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_LIST_ITEMS, fetchItemsList);
}
