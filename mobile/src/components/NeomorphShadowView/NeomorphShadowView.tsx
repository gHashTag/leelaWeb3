import React from 'react'

import { View, ViewStyle, StyleSheet } from 'react-native'

import { lightGray, white } from 'cons'
import { Shadow } from 'react-native-neomorph-shadows'

interface NeomorphShadowViewProps {
  children: React.ReactNode
  viewStyle?: ViewStyle
}

const NeomorphShadowView: React.FC<NeomorphShadowViewProps> = ({
  children,
  viewStyle,
}) => {
  return (
    <Shadow
      style={{
        ...styles.shadow,
      }}
    >
      <View style={viewStyle}>{children}</View>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  shadow: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: white,

    borderRadius: 25,
    height: 1,
    shadowColor: lightGray,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    width: 1,
  },
})

export { NeomorphShadowView }
