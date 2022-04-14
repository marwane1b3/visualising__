import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import { DEFAULT_LOCALE } from 'locales';

export const translationGetters: { [key: string]: any } = {
  // lazy requires (metro bundler does not support symlinks)
  ['en']: () => require('./translations/en.json'),
  ['fr']: () => require('./translations/fr.json'),
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const t = translate;

export const setI18nConfig = (codeLang?: string) => {
  // fallback if no available language fits
  const fallback = { languageTag: DEFAULT_LOCALE, isRTL: false };
  const lang = codeLang ? { languageTag: codeLang, isRTL: false } : null;

  const { languageTag, isRTL }: { languageTag: string; isRTL: boolean } = lang
    ? lang
    : RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;

  // clear translation cache
  translate?.cache.clear && translate?.cache.clear();

  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
  i18n.defaultSeparator = '-';

  return languageTag;
};

// ************************************

// import i18n from 'i18n-js';
// import ReactNative from 'react-native';

// import { en, fr } from 'translations';

// // i18n.defaultLocale = 'en';
// i18n.locale = 'fr';

// // Should the app fallback to English if user locale doesn't exists
// i18n.fallbacks = true;

// // Define the supported translations
// i18n.translations = { en, fr };

// i18n.defaultSeparator = '-';

// const currentLocale = i18n.currentLocale();

// // Is it a RTL language?
// export const isRTL =
//   currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// // Allow RTL alignment in RTL languages
// ReactNative.I18nManager.allowRTL(isRTL);

// export default i18n;
