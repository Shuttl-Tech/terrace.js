import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en';
import de from './de';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
  	// we init with resources
  	resources: {
  		en: { translations: en },
  		de: { translations: de }
  	},
  	fallbackLng: 'en',
  	debug: process.env.NODE_ENV === 'development',

  	// have a common namespace used around the full app
  	ns: ['translations'],
  	defaultNS: 'translations',

  	keySeparator: false, // we use content as keys

  	interpolation: {
  		escapeValue: false, // not needed for react as it escapes by default
  		formatSeparator: ','
  	},

  	react: {
  		wait: true
  	}
  });

export default i18n;
