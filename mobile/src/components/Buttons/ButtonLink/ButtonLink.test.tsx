import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import { ButtonLink } from './ButtonLink'

describe('ButtonLink Component', () => {
  it('calls onPress callback when pressed', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <ButtonLink title="Test Link" onPress={onPressMock} />,
    )

    const buttonLinkContainer = getByTestId('button-link-container')

    // Simulate button press
    fireEvent.press(buttonLinkContainer)

    // Check if the onPress callback was called
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it('renders title correctly', () => {
    const title = 'Test Link'
    const { getByTestId } = render(
      <ButtonLink title={title} onPress={() => {}} />,
    )

    const buttonLinkTitle = getByTestId('button-link-title')

    // Check if title is rendered correctly
    expect(buttonLinkTitle.props.children).toBe(title)
  })
})
