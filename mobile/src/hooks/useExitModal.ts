import { BackHandler } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

import { OpenExitModal } from '../cons'

const useExitModal = () => {
  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        OpenExitModal()
        return true
      },
    )
    return () => backHandler.remove()
  })
}

export { useExitModal }
