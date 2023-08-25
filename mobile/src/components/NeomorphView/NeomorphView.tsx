import React from 'react'

import { View, StyleSheet } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { black, lightGray } from 'cons'
import {
  Neomorph,
  ViewStyleWithNeomorphShadow,
} from 'react-native-neomorph-shadows'

interface NeomorphViewProps {
  children: React.ReactNode
  viewStyle?: ViewStyleWithNeomorphShadow
}

const NeomorphView: React.FC<NeomorphViewProps> = ({ children, viewStyle }) => {
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
    borderRadius: 20,
    shadowRadius: 5,
  },
})

export { NeomorphView }
