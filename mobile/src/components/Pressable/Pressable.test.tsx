import React from 'react'

import { Text } from 'react-native'

import { render, fireEvent } from '@testing-library/react-native'

import { Pressable } from './Pressable'

describe('Pressable', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Pressable>
        <Text>Test Pressable</Text>
      </Pressable>,
    )

    expect(getByText('Test Pressable')).toBeDefined()
  })

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
      <Pressable onPress={onPressMock}>
        <Text>Press Me</Text>
      </Pressable>,
    )

    fireEvent.press(getByText('Press Me'))

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })
})
