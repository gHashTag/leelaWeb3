import Rate from 'react-native-rate'

export const onLeaveFeedback = (onAction: (success: any) => void) => {
  const options = {
    AppleAppID: '1296604457',
    GooglePackageName: 'com.leelagame',
    OtherAndroidURL:
      'https://play.google.com/store/apps/details?id=com.leelagame',
    preferInApp: true,
    openAppStoreIfInAppFails: true,
  }
  Rate.rate(options, onAction)
}
