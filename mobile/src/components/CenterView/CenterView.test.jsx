import React from 'react'

import { Text } from 'react-native'

import { render } from '@testing-library/react-native'

import { CenterView } from './CenterView'

describe('CenterView Component', () => {
  it('renders children correctly', () => {
    const { toJSON } = render(
      <CenterView>
        <Text>Centered Content</Text>
      </CenterView>,
    )

    expect(toJSON()).toMatchSnapshot()
  })
  it('renders children orrectly', () => {
    const { getByText } = render(
      <CenterView>
        <Text>Centered Content</Text>
      </CenterView>,
    )

    const centeredContent = getByText('Centered Content')

    // Check if the children are rendered correctly
    expect(centeredContent).toBeTruthy()
  })
})
