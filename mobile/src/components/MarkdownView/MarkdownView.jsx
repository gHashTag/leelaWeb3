/* eslint-disable react-native/no-unused-styles */
import React from 'react'

import { Platform, ScrollView, StyleSheet } from 'react-native'
import { View } from 'react-native'

import { NeomorphView } from 'components'
import { gray, W } from 'cons'
import Markdown from 'react-native-markdown-display'
import { ms, s } from 'react-native-size-matters'

import { Space } from '../Space/Space'

const MarkdownView = ({ markdown, children }) => {
  return (
    <NeomorphView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
      >
        <Markdown style={styles}>{markdown}</Markdown>
        <Space height={s(10)} />
        <View style={styles.input}>{children}</View>
        <Space height={s(100)} />
      </ScrollView>
    </NeomorphView>
  )
}

const styles = StyleSheet.create({
  body: {
    color: gray,
    fontFamily: 'Montserrat-Regular',
    fontSize: Platform.OS === 'ios' ? s(15) : s(15),
    fontWeight: 'normal',
  },
  container: {
    alignSelf: 'center',
    height: '100%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: '90%',
  },
  heading1: {
    color: gray,
    fontFamily: Platform.OS === 'ios' ? 'mont' : 'mont',
    fontSize: Platform.OS === 'ios' ? ms(25, 0.5) : ms(30, 0.3),
    fontWeight: 'bold',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  heading2: {
    color: gray,
    fontFamily: 'mont',
    fontSize: Platform.OS === 'ios' ? s(20) : s(20),
  },
  heading3: {
    color: gray,
    fontFamily: 'mont',
    fontSize: Platform.OS === 'ios' ? ms(18, 0.6) : ms(18, 0.6),
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  heading4: {
    color: gray,
    fontFamily: 'mont',
    fontSize: Platform.OS === 'ios' ? ms(15, 0.8) : s(15),
    textShadowRadius: 1,
  },
  heading5: {
    color: gray,
    fontFamily: Platform.OS === 'ios' ? 'mont' : 'mont',
    fontSize: Platform.OS === 'ios' ? s(15) : s(15),
  },
  heading6: {
    color: gray,
    fontFamily: 'mont',
    fontSize: Platform.OS === 'ios' ? s(15) : s(15),
  },
  input: {
    alignSelf: 'center',
    width: W,
  },
})

export { MarkdownView }
