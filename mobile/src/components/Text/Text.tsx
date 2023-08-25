import React, { memo } from 'react'

import {
  Platform,
  Text as RNText,
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
  useColorScheme,
} from 'react-native'

import { gray } from 'cons'
import { ms, s } from 'react-native-size-matters'

export type hT = 'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

export interface Icolors {
  dark: string
  light: string
}

export interface TxtT extends TextProps {
  title: string
  h?: hT
  colors?: Icolors
  oneColor?: string
  numberOfLines?: number
  textStyle?: StyleProp<TextStyle>
  testID?: string
  onPress?: () => void
}

const Text = memo<TxtT>(
  ({
    h,
    colors,
    title,
    oneColor = gray,
    numberOfLines,
    textStyle,
    testID = 'text',
    onPress,
    ...textProps
  }) => {
    const scheme = useColorScheme()
    const isDark = scheme === 'dark'

    let curColor = oneColor
    if (colors) {
      curColor = isDark ? colors.dark : colors.light
    }

    let hStyle: TextStyle | undefined
    if (h && textStyles[h]) {
      // @ts-ignore
      hStyle = { ...textStyles[h], color: curColor }
    }

    const mergedStyles: StyleProp<TextStyle> = StyleSheet.flatten([
      hStyle,
      textStyle,
    ])

    return (
      <RNText
        style={mergedStyles}
        {...textProps}
        testID={testID}
        ellipsizeMode="tail"
        numberOfLines={numberOfLines}
        onPress={onPress}
      >
        {title}
      </RNText>
    )
  },
)

export const textStyles = StyleSheet.create({
  h0: {
    fontFamily: Platform.OS === 'ios' ? 'Etna' : 'etna-free-font',
    fontSize: Platform.OS === 'ios' ? ms(95, 0.5) : ms(95, 0.3),
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  h1: {
    fontFamily: 'mont',
    fontSize: Platform.OS === 'ios' ? ms(35, 0.3) : ms(35, 0.6),
    fontWeight: 'bold',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  h2: {
    fontFamily: 'mont',
    fontSize: Platform.OS === 'ios' ? s(20) : s(20),
    fontWeight: 'bold',
    lineHeight: 20,
  },
  h3: {
    fontFamily: 'mont',
    fontSize: Platform.OS === 'ios' ? ms(18, 0.6) : ms(18, 0.6),
    lineHeight: 20,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  h4: {
    fontFamily: Platform.OS === 'ios' ? 'mont' : 'mont',
    fontSize: Platform.OS === 'ios' ? s(15) : s(15),
    lineHeight: 18,
  },
  h5: {
    fontFamily: 'mont',
    fontSize: Platform.OS === 'ios' ? ms(12, 0.8) : s(15),
  },
})

export { Text }
