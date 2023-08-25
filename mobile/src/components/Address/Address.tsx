import React, { useState } from 'react'

import { StyleSheet, Pressable } from 'react-native'

import Clipboard from '@react-native-clipboard/clipboard'
import { Space, Text } from 'components'
import { accountHumanReadable, gray } from 'cons'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface AddressProps {
  rlyAccount: string
}

const Address: React.FC<AddressProps> = ({ rlyAccount }) => {
  const { short, full } = accountHumanReadable(rlyAccount)
  const [isPressed, setIsPressed] = useState(false)

  const copyFullToClipboard = () => {
    Clipboard.setString(full)
    setIsPressed(true)
    setTimeout(() => {
      setIsPressed(false)
    }, 300)
  }

  return (
    <Pressable
      onPress={copyFullToClipboard}
      style={[styles.container, isPressed && styles.pressed]}
    >
      <Text h={'h3'} title={short} testID="copy-button" />
      <Space width={10} />
      <Ionicons name="copy-outline" size={20} color={gray} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    opacity: 1,
  },
  pressed: {
    opacity: 0.5,
  },
})

export { Address }
