import React from 'react'

import { View, StyleSheet } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { black, lightGray } from 'cons'
import {
  Neomorph,
  ViewStyleWithNeomorphShadow,
} from 'react-native-neomorph-shadows'

interface NeomorphCircleProps {
  viewStyle?: ViewStyleWithNeomorphShadow
  children?: React.ReactNode
}

const NeomorphCircle: React.FC<NeomorphCircleProps> = ({
  children,
  viewStyle,
}) => {
  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray

  return (
    <Neomorph
      style={{
        ...styles.container,
        ...viewStyle,
        backgroundColor,
      }}
    >
      <View style={viewStyle}>{children}</View>
    </Neomorph>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    shadowRadius: 5,
  },
})

export { NeomorphCircle }
