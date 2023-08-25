import React, { useRef } from 'react'

import {
  Animated,
  StyleSheet,
  Easing,
  Pressable,
  useColorScheme,
} from 'react-native'

import { vs } from 'react-native-size-matters'

export interface DiceProps {
  disabled?: boolean
  rollDice: () => void
  lastRoll: number
  size?: 'small' | 'medium' | 'large'
}

const Dice = ({
  disabled = false,
  rollDice,
  lastRoll,
  size = 'medium',
}: DiceProps & { lastRoll: number }) => {
  const isDarkMode = useColorScheme() === 'dark'
  const spinValue = useRef(new Animated.Value(0)).current

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const animateDice = (): void => {
    if (disabled) {
      return
    }

    spinValue.setValue(0)
    Animated.timing(spinValue, {
      toValue: 10,
      duration: 500, //2000,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start(() => {
      rollDice()
    })
  }

  const getSize = () => {
    switch (size) {
      case 'small':
        return vs(50)
      case 'large':
        return vs(120)
      case 'medium':
      default:
        return vs(80)
    }
  }
  const getImage = (number: number, isDarkTheme: boolean) => {
    switch (number) {
      case 1:
        return isDarkTheme
          ? require('./assets_dark/1.png')
          : require('./assets_light/1.png')
      case 2:
        return isDarkTheme
          ? require('./assets_dark/2.png')
          : require('./assets_light/2.png')
      case 3:
        return isDarkTheme
          ? require('./assets_dark/3.png')
          : require('./assets_light/3.png')
      case 4:
        return isDarkTheme
          ? require('./assets_dark/4.png')
          : require('./assets_light/4.png')
      case 5:
        return isDarkTheme
          ? require('./assets_dark/5.png')
          : require('./assets_light/5.png')
      case 6:
        return isDarkTheme
          ? require('./assets_dark/6.png')
          : require('./assets_light/6.png')
      default:
        return null
    }
  }
  return (
    <Pressable
      onPress={animateDice}
      style={styles.diceContainer}
      testID="dice-component"
    >
      <Animated.Image
        style={[
          styles.image,
          {
            transform: [{ rotate: spin }],
            height: getSize(),
            width: getSize(),
          },
        ]}
        source={getImage(lastRoll, isDarkMode)}
        testID="dice-image"
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  diceContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: vs(12),
  },
  image: {
    height: vs(65),
    width: vs(65),
  },
})

export { Dice }
