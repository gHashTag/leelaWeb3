import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import { Button } from './Button'

describe('Button Component', () => {
  it('renders correctly', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <Button title="Test Button" onPress={onPressMock} />,
    )

    const buttonTitle = getByTestId('button-title')

    // Simulate button press
    fireEvent.press(buttonTitle)

    // Check if the onPress callback was called
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })
})
