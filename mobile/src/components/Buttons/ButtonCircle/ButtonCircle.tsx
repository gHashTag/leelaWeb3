import React, { memo, useState } from 'react'

import { Pressable, useColorScheme, StyleSheet, Image } from 'react-native'

import { dimGray, gray } from 'cons'
import { ms, s } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { NeomorphView, NeomorphFlexView } from '../..'

interface ButtonCircleProps {
  name: string
  onPress: () => void
  isIonicons: boolean
  size?: number
}

const ButtonCircle = memo<ButtonCircleProps>(
  ({ name, onPress, isIonicons, size = 30 }) => {
    const [isPressed, setIsPressed] = useState(false)

    const scheme = useColorScheme()
    const colorTheme = scheme === 'dark' ? dimGray : gray

    const handlePressIn = () => {
      setIsPressed(true)
    }

    const handlePressOut = () => {
      setIsPressed(false)
      onPress && onPress()
    }

    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.card, styles.container]}
        testID="buttonCircle"
      >
        {isPressed ? (
          <NeomorphFlexView viewStyle={styles.card}>
            {isIonicons ? (
              <Ionicons
                name={name}
                size={size}
                color={gray}
                style={styles.icon}
              />
            ) : (
              <Image source={{ uri: name }} style={styles.img} />
            )}
          </NeomorphFlexView>
        ) : (
          <NeomorphView viewStyle={styles.card}>
            {isIonicons ? (
              <Ionicons
                name={name}
                size={size}
                color={colorTheme}
                style={styles.icon}
              />
            ) : (
              <Image source={{ uri: name }} style={styles.img} />
            )}
          </NeomorphView>
        )}
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
  card: {
    borderRadius: s(25),
    height: ms(50, 0.9),
    justifyContent: 'center',
    width: ms(50, 0.9),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  img: {
    borderRadius: s(20),
  },
})

export { ButtonCircle }
