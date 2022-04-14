import { setI18nConfig } from 'i18n';
import { AnyAction } from 'redux';
import {
  takeLatest,
  put,
  call,
  // select,
} from 'redux-saga/effects';
import { setLocalAction } from './actions';
import { CHANGE_LOCALE } from './constants';

export function* changeLocale({ languageLocale }: AnyAction) {
  try {
    const newSetLocale: string = yield call(() => {
      const lang = setI18nConfig(languageLocale);
      return lang;
    });
    yield put(setLocalAction(newSetLocale));
  } catch (error) {
    console.error({ error });
  }
}

// Individual exports for testing
export default function* detailsScreenSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CHANGE_LOCALE, changeLocale);
}
