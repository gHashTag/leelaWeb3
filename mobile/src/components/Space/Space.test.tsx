// Import libraries
import React from 'react'

import { render } from '@testing-library/react-native'
import { s } from 'react-native-size-matters'

import { Space } from './Space'
// Import the component to be tested

describe('Space', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Space />)
    const spaceComponent = getByTestId('space-component')

    expect(spaceComponent.props.style).toEqual({ height: 0, width: 0 })
  })

  it('renders correctly with given height and width', () => {
    const { getByTestId } = render(<Space height={10} width={20} />)
    const spaceComponent = getByTestId('space-component')

    expect(spaceComponent.props.style).toEqual({
      height: s(10) || 0,
      width: s(20) || 0,
    })
  })
})
