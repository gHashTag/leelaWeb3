import React, { memo } from 'react'

import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { secondary } from 'cons'

import { Text } from '../..'
import { Pressable } from '../../Pressable/Pressable'

interface ButtonLinkT {
  title: string
  viewStyle?: StyleProp<ViewStyle>
  onPress?: () => void
  textStyle?: StyleProp<TextStyle>
}

const ButtonLink = memo<ButtonLinkT>(
  ({ title, viewStyle, textStyle, onPress }) => {
    const { container, h } = styles

    return (
      <Pressable
        onPress={onPress}
        style={[container, viewStyle]}
        testID="button-link-container"
      >
        <Text
          h={'h4'}
          title={title}
          textStyle={[h, textStyle]}
          testID="button-link-title"
        />
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  h: {
    color: secondary,
    textDecorationLine: 'underline',
  },
})

export { ButtonLink }
