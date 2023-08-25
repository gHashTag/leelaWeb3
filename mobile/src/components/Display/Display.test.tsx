import React from 'react'

import { render } from '@testing-library/react-native'

import { Display } from './Display'

describe('Display Component', () => {
  it('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <Display title="Expected Display Text" />,
    )

    const displayText = getByTestId('display-text')
    const expectedTitle = 'Expected Display Text' // Замените на ожидаемый текст

    // Check if the component renders
    expect(displayText).toBeTruthy()

    // Check if the translated text renders correctly
    expect(getByText(expectedTitle)).toBeTruthy()
  })
})
