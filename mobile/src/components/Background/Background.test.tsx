import React from 'react'

import { Text } from 'react-native'

import { render } from '@testing-library/react-native'
import renderer from 'react-test-renderer'

import { Background } from './Background'

describe('Background Component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Background>
          <Text testID="child-text">Hello, World!</Text>
        </Background>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders children', () => {
    const { getByTestId } = render(
      <Background>
        <Text testID="child-text">Hello, World!</Text>
      </Background>,
    )
    const childText = getByTestId('child-text')
    expect(childText).toBeTruthy()
    expect(childText.props.children).toBe('Hello, World!')
  })
})
