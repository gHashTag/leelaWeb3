import React from 'react'

import { View, TextInput, StyleSheet } from 'react-native'

import { NeomorphFlexView } from 'components'
import { gray } from 'cons'
import { ms, s } from 'react-native-size-matters'

interface TextInputFieldProps {
  placeholder: string
  multiline?: boolean
  isWide?: boolean
  value: string
  onBlur: () => void
  onChangeText: (text: string) => void
  inputMode?:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password'
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  multiline = false,
  inputMode,
  keyboardType,
  isWide = false,
}) => {
  const height = multiline ? null : ms(isWide ? 90 : 60, 0.9)
  const inputComponent = (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={gray}
        multiline={multiline}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        inputMode={inputMode}
        keyboardType={keyboardType}
      />
    </View>
  )

  return (
    <NeomorphFlexView viewStyle={{ ...styles.card, height }}>
      {inputComponent}
    </NeomorphFlexView>
  )
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    borderRadius: s(40),
    justifyContent: 'center',
    width: ms(290, 0.9),
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 10,
  },
  input: {
    bottom: 1,
    color: gray,
    flex: 1,
    fontSize: 16,
  },
})

export { TextInputField }
