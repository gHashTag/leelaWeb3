import React, { memo, useState } from 'react'

import { StyleProp, StyleSheet, TextStyle, Pressable } from 'react-native'

import { dimGray } from 'cons'
import { ms, s } from 'react-native-size-matters'

import { Text, NeomorphView, NeomorphFlexView, hT } from '../..'

interface ButtonProps {
  title: string
  onPress: () => void
  textStyle?: StyleProp<TextStyle>
  h?: hT
}

const Button = memo<ButtonProps>(({ title, onPress, textStyle, h = 'h1' }) => {
  const [isPressed, setIsPressed] = useState(false)

  const { h: textStyleH } = styles

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
      style={styles.container}
    >
      {isPressed ? (
        // @ts-ignore
        <NeomorphFlexView viewStyle={styles.card}>
          <Text
            testID="button-container"
            h={h}
            textStyle={[textStyleH, textStyle]}
            title={title}
            oneColor={dimGray}
          />
        </NeomorphFlexView>
      ) : (
        // @ts-ignore
        <NeomorphView viewStyle={styles.card}>
          <Text
            h={h}
            textStyle={[textStyleH, textStyle]}
            title={title}
            testID="button-title"
          />
        </NeomorphView>
      )}
    </Pressable>
  )
})

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    borderRadius: s(40),
    height: ms(60, 0.9),
    justifyContent: 'center',
    width: ms(230, 0.9),
  },
  container: {
    height: ms(60, 0.9),
    width: ms(230, 0.9),
  },
  h: {
    textAlign: 'center',
    top: 3,
  },
})

export { Button }
