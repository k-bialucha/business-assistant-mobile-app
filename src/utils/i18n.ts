import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { translationEN } from './translations/en';
import { translationPL } from './translations/pl';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: Function) => {
    return Localization.getLocalizationAsync().then(({ locale }) => {
      callback(locale.split('-')[0]);
    });
  },
  init: () => ({}),
  cacheUserLanguage: () => ({}),
} as const;

const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
} as const;

i18n
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',

    resources,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false, // fix issue with Suspense on Android
    },
  });

export default i18n;
