import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import { ButtonVectorIcon } from './ButtonVectorIcon'

describe('ButtonVectorIcon Component', () => {
  it('calls onPress callback when pressed', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <ButtonVectorIcon
        name="volume-up"
        onPress={onPressMock}
        testID="button-vector-icon"
      />,
    )

    const buttonVectorIcon = getByTestId('button-vector-icon')

    // Simulate button press
    fireEvent.press(buttonVectorIcon)

    // Check if the onPress callback was called
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it('renders correct icon', () => {
    const iconName = 'volume-up'
    const { getByTestId } = render(
      <ButtonVectorIcon
        name={iconName}
        onPress={() => {}}
        testID="button-vector-icon"
      />,
    )

    const renderedIcon = getByTestId('button-vector-icon')

    // Check if the correct icon is rendered
    expect(renderedIcon).toBeTruthy()
    // You might also want to check for the specific icon library used (FontAwesome, Ionicons, etc.)
    // For example, if FontAwesome is used:
    // expect(renderedIcon.getByType(Icon).props.name).toBe(iconName);
    // If Ionicons is used:
    // expect(renderedIcon.getByType(Ionicons).props.name).toBe(iconName);
  })

  it('renders count correctly', () => {
    const count = 10
    const { getByTestId, getByText } = render(
      <ButtonVectorIcon
        name="volume-up"
        onPress={() => {}}
        count={count}
        testID="button-vector-icon"
      />,
    )

    const renderedIcon = getByTestId('button-vector-icon')
    const renderedCount = getByText(count.toString())

    // Check if the count is rendered correctly
    expect(renderedIcon).toBeTruthy()
    expect(renderedCount).toBeTruthy()
  })
})
