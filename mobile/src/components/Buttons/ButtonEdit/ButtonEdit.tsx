import React from 'react'

import { Image, StyleProp, StyleSheet, ViewStyle } from 'react-native'

import { vs } from 'react-native-size-matters'

import { Pressable } from '../../Pressable/Pressable'

interface ButtonEditT {
  onPress: () => void
  viewStyle?: StyleProp<ViewStyle>
}

const ButtonEdit = ({ onPress, viewStyle }: ButtonEditT) => {
  return (
    <Pressable onPress={onPress} style={viewStyle} testID="button-edit">
      <Image style={styles.img} source={require('./edit.png')} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  img: {
    height: vs(18),
    width: vs(18),
  },
})

export { ButtonEdit }
