import React from 'react'

import { StyleProp, ViewStyle, useColorScheme, StyleSheet } from 'react-native'

import { dimGray, gray } from 'cons'
import { s } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Text } from '../../'
import { Pressable } from '../../Pressable/Pressable'
import { Space } from '../../Space/Space'

interface ButtonVectorIconI {
  name: string
  size?: number
  iconSize?: number
  color?: string
  onPress?: () => void | Promise<void>
  viewStyle?: StyleProp<ViewStyle>
  count?: number
  isIonicons?: boolean
  testID: string
  onPressIn?: () => void
}

export function ButtonVectorIcon({
  name,
  onPress,
  size = s(10),
  iconSize,
  color,
  viewStyle,
  count,
  isIonicons,
  onPressIn,
  testID,
}: ButtonVectorIconI) {
  const scheme = useColorScheme()
  const colorTheme = scheme === 'dark' ? dimGray : gray
  const summaryIconSize = iconSize ? iconSize : size
  const summaryIoniconsSize = iconSize ? iconSize + s(2) : size + s(2)
  return (
    <Pressable
      style={viewStyle}
      onPress={onPress}
      onPressIn={onPressIn}
      testID={testID}
    >
      {isIonicons ? (
        <Ionicons
          name={name}
          size={summaryIoniconsSize}
          color={color ? color : colorTheme}
        />
      ) : (
        <Icon
          name={name}
          size={summaryIconSize}
          color={color ? color : colorTheme}
        />
      )}
      {count !== undefined && (
        <>
          <Space width={s(5)} />
          <Text
            title={count.toString()}
            h={'h5'}
            textStyle={[
              styles.fontStyle,
              { fontSize: size, color: colorTheme },
            ]}
            testID="button-link-title"
          />
        </>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  fontStyle: {
    top: 3,
  },
})
