import React from 'react'

import { View, StyleSheet } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { black, lightGray } from 'cons'
import {
  NeomorphBlur,
  ViewStyleWithNeomorphShadow,
} from 'react-native-neomorph-shadows'

interface NeomorphBlurViewProps {
  children?: React.ReactNode
  viewStyle?: ViewStyleWithNeomorphShadow
}

const NeomorphBlurView: React.FC<NeomorphBlurViewProps> = ({
  children,
  viewStyle,
}) => {
  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray

  return (
    <NeomorphBlur
      style={{
        ...styles.container,
        ...viewStyle,
        backgroundColor,
      }}
      testID="neomorph-blur-view"
    >
      <View style={viewStyle}>{children ? children : ''}</View>
    </NeomorphBlur>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: black,
    borderRadius: 70,
    height: 140,
    shadowRadius: 12,
    width: 140,
  },
})

export { NeomorphBlurView }
