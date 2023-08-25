import { Platform, NativeModules } from 'react-native'

export const getSystemLanguage = () => {
  let languageCode = 'en' // Default to English

  if (Platform.OS === 'android') {
    languageCode = NativeModules.I18nManager.localeIdentifier
  } else if (Platform.OS === 'ios') {
    languageCode = NativeModules.SettingsManager.settings.AppleLocale
  }

  return languageCode.slice(0, 2).toLowerCase()
}
