/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE, SET_LOCALE } from './constants';

export function changeLocaleAction(languageLocale?: string) {
  return {
    type: CHANGE_LOCALE,
    languageLocale,
  };
}
export function setLocalAction(locale: string) {
  return {
    type: SET_LOCALE,
    locale,
  };
}
