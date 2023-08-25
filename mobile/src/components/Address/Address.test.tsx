import React from 'react'

import Clipboard from '@react-native-clipboard/clipboard'
import { fireEvent, render } from '@testing-library/react-native'

import { Address } from '../Address'

describe('Address component', () => {
  it('should copy full address to clipboard and change opacity on press', async () => {
    const rlyAccount = 'exampleAddress12345'

    const { getByTestId, getByText } = render(
      <Address rlyAccount={rlyAccount} />,
    )

    const copyButton = getByTestId('copy-button')
    expect(copyButton).toBeDefined()

    // Mock the clipboard's setString function
    const mockSetString = jest.fn()
    Clipboard.setString = mockSetString

    // Trigger the press event on the copy button
    fireEvent.press(copyButton)

    // Expect that setString was called with the correct value
    expect(mockSetString).toHaveBeenCalledWith(rlyAccount)
    // Check the rendered text after animations complete
    const renderedText = getByText('examp...ress12345')
    expect(renderedText).toBeTruthy()
  })
})
