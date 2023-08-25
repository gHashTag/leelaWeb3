import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import { TextInputField } from './TextInputField'

test('renders TextInputField correctly', () => {
  const placeholder = 'Enter text'
  const value = 'Hello, world!'
  const onBlur = jest.fn()
  const onChangeText = jest.fn()

  const { getByPlaceholderText } = render(
    <TextInputField
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
    />,
  )

  const input = getByPlaceholderText(placeholder)

  expect(input).toBeDefined()
  expect(input.props.value).toBe(value)

  // Simulate typing in the input field
  const newText = 'New text'
  fireEvent.changeText(input, newText)
  expect(onChangeText).toHaveBeenCalledWith(newText)
})
