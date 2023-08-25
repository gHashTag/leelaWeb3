import React, { memo } from 'react'

import { Platform, View, StyleSheet } from 'react-native'

// import { StackHeaderProps } from '@react-navigation/stack'
import { Avatar, ButtonCircle } from 'components'
import { W } from 'cons'
import { goBack, navigate } from 'cons/navigation'
import { useGlobalBackground } from 'hooks'
import _ from 'lodash'
import { mvs, s, vs } from 'react-native-size-matters'

const isIos = Platform.OS === 'ios'

export interface HeaderT {
  // navigation: StackHeaderProps['navigation']
  avatar?: string
  leftName?: string
  onPress?: () => void | null
  onPressRight?: () => void
  onPressCenter?: () => void
  isCenterButton?: boolean
  plan?: number
  isStartGame?: boolean
}

const Header = memo<HeaderT>(
  ({
    avatar,
    leftName = 'arrow-back',
    onPress = () => {
      goBack()
    },
    onPressCenter = () => {
      navigate('PLAYER_SCREEN', { oldPlan: plan })
    },
    onPressRight = () => {
      navigate('PLANS_SCREEN')
    },
    isCenterButton = true,
    plan = 58,
    isStartGame = false,
  }) => {
    const { backgroundColor } = useGlobalBackground()[0]
    const debouncedOnPress = _.debounce((handler) => handler(), 500)

    let centerButton = null
    if (isCenterButton && avatar) {
      centerButton = (
        <Avatar
          plan={plan}
          size="medium"
          avatar={avatar}
          isAccept={true}
          onPress={() => debouncedOnPress(onPressCenter)}
        />
      )
    }

    return (
      <View style={[styles.container, { backgroundColor }]}>
        {!isStartGame && (
          <>
            <ButtonCircle
              name={leftName}
              isIonicons
              size={30}
              onPress={() => debouncedOnPress(onPress)}
            />
            <View style={styles.flexOne}>{centerButton}</View>
            <ButtonCircle
              name="book"
              isIonicons
              size={30}
              onPress={() => debouncedOnPress(onPressRight)}
            />
          </>
        )}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: mvs(1, 0.4),
    paddingHorizontal: 20,
    paddingTop: 70,
    width: W,
    zIndex: 20,
  },
  flexOne: {
    bottom: 8,
  },
  pressStyle: {
    bottom: 3,
  },
  rightViewStyle: {
    width: isIos ? s(60) : s(44),
  },
  titleStyle: {
    fontSize: vs(18),
  },
})

export { Header }
