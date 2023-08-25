import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import { ButtonEdit } from './ButtonEdit'

describe('ButtonEdit Component', () => {
  it('calls onPress callback when pressed', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(<ButtonEdit onPress={onPressMock} />)

    const buttonEdit = getByTestId('button-edit')

    // Simulate button press
    fireEvent.press(buttonEdit)

    // Check if the onPress callback was called
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })
})
