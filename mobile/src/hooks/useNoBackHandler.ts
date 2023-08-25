import { BackHandler } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

const useNoBackHandler = () => {
  useFocusEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => true)
    return sub.remove
  })
}

export { useNoBackHandler }
