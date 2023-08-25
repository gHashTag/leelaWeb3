import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'

import ar from './locales/ar/translation.json'
import bn from './locales/bn/translation.json'
import de from './locales/de/translation.json'
import en from './locales/en/translation.json'
import es from './locales/es/translation.json'
import fr from './locales/fr/translation.json'
import hi from './locales/hi/translation.json'
import ja from './locales/ja/translation.json'
import jv from './locales/jv/translation.json'
import ko from './locales/ko/translation.json'
import mr from './locales/mr/translation.json'
import ms from './locales/ms/translation.json'
import pa from './locales/pa/translation.json'
import pt from './locales/pt/translation.json'
import ru from './locales/ru/translation.json'
import ta from './locales/ta/translation.json'
import te from './locales/te/translation.json'
import tr from './locales/tr/translation.json'
import uk from './locales/uk/translation.json'
import ur from './locales/ur/translation.json'
import vi from './locales/vi/translation.json'
import zh from './locales/zh/translation.json'

const locales = RNLocalize.getLocales()

if (!Array.isArray(locales) || locales.length === 0) {
  throw new Error('No locales found')
}

export const lang = locales[0]?.languageCode
if (!lang) {
  throw new Error('No language code found for first locale')
}

const resources = {
  ar: {
    translation: ar,
  },
  bn: {
    translation: bn,
  },
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  mr: {
    translation: mr,
  },
  ms: {
    translation: ms,
  },
  ru: {
    translation: ru,
  },
  te: {
    translation: te,
  },
  tr: {
    translation: tr,
  },
  uk: {
    translation: uk,
  },
  zh: {
    translation: zh,
  },
  es: {
    translation: es,
  },
  hi: {
    translation: hi,
  },
  pt: {
    translation: pt,
  },
  ja: {
    translation: ja,
  },
  pa: {
    translation: pa,
  },
  jv: {
    translation: jv,
  },
  ko: {
    translation: ko,
  },
  de: {
    translation: de,
  },
  vi: {
    translation: vi,
  },
  ta: {
    translation: ta,
  },
  ur: {
    translation: ur,
  },
}

for (const [key, value] of Object.entries(resources)) {
  if (typeof value !== 'object' || value === null) {
    throw new Error(`Invalid locale data for language ${key}`)
  }
}

export const supportedLngs = [
  'ar',
  'bn',
  'en',
  'fr',
  'mr',
  'ms',
  'ru',
  'te',
  'tr',
  'uk',
  'zh',
  'es',
  'hi',
  'pt',
  'ja',
  'pa',
  'jv',
  'ko',
  'de',
  'vi',
  'ta',
  'ur',
]

export const isSupportedLang = supportedLngs.includes(lang)
export const ruOrEnLang = lang === 'ru' ? 'ru' : 'en'

i18next.use(initReactI18next).init(
  {
    compatibilityJSON: 'v3',
    resources,
    lng: isSupportedLang ? lang : ruOrEnLang,
    debug: __DEV__,
    interpolation: {
      escapeValue: true,
    },
    react: {
      useSuspense: false,
    },
    // keySeparator: false,
  },
  (err) => {
    if (err) {
      __DEV__ && console.error('Error initializing i18next:', err)
    }
  },
)

export default i18next
