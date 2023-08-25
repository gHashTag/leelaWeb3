import React, { memo, useState } from 'react'

import { StyleProp, StyleSheet, TextStyle, Pressable } from 'react-native'

import { W, dimGray } from 'cons'
import { ms, s } from 'react-native-size-matters'

import { Text, NeomorphView, NeomorphFlexView, hT } from '../..'

interface ButtonProps {
  title: string
  onPress: () => void
  textStyle?: StyleProp<TextStyle>
  h?: hT
}

const ButtonItem = memo<ButtonProps>(
  ({ title, onPress, textStyle, h = 'h2' }) => {
    const [isPressed, setIsPressed] = useState(false)

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
              textStyle={[styles.text, textStyle]}
              title={title}
              oneColor={dimGray}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </NeomorphFlexView>
        ) : (
          // @ts-ignore
          <NeomorphView viewStyle={styles.card}>
            <Text
              h={h}
              textStyle={[styles.text, textStyle]}
              title={title}
              testID="button-title"
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </NeomorphView>
        )}
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    borderRadius: s(40),
    height: ms(60, 0.9),
    justifyContent: 'center',
    width: W - 80,
  },
  container: {
    height: ms(60, 0.9),
  },
  text: {
    paddingHorizontal: 20,
    textAlign: 'left',
    top: 2,
  },
})

export { ButtonItem }
