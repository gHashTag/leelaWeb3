// src/components/Gem/Gem.test.tsx
import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'
import renderer from 'react-test-renderer'

import { Gem } from '../'

const playerWithNumber = {
  id: 1,
  plan: 68,
  avatar: '',
}

const playerWithNumberAvatar = {
  id: 3,
  plan: 34,
  avatar: 106,
}

describe('Gem Component', () => {
  test('Gem component snapshot', () => {
    const component = renderer.create(
      <Gem player={playerWithNumber} planNumber={68} onPress={() => {}} />,
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should have the correct testID prop', () => {
    const { getByTestId } = render(<Gem planNumber={5} onPress={() => {}} />)
    const gemNumber = getByTestId('gem-number')
    expect(gemNumber).toBeDefined()
  })

  test('should call the onPress function when pressed', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(<Gem planNumber={5} onPress={onPressMock} />)
    const gemContainer = getByTestId('gem-container')
    fireEvent.press(gemContainer)
    expect(onPressMock).toHaveBeenCalled()
  })

  test('should render number for player with plan number 68', () => {
    const { queryByTestId } = render(
      <Gem player={playerWithNumber} planNumber={68} />,
    )

    const numberGem = queryByTestId('gem-number')
    expect(numberGem).toBeNull()

    const imageGem = queryByTestId('player-gem-image')
    expect(imageGem).toBeFalsy()
  })

  test('should render correctly for player with number avatar', () => {
    const { getByTestId } = render(
      <Gem player={playerWithNumberAvatar} planNumber={69} />,
    )
    const imageGem = getByTestId('player-gem-image')
    expect(imageGem).toBeTruthy()
  })

  test('should call onPress function when gem is pressed', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <Gem
        player={playerWithNumberAvatar}
        planNumber={69}
        onPress={onPressMock}
      />,
    )
    const gemContainer = getByTestId('gem-container')
    fireEvent.press(gemContainer)
    expect(onPressMock).toHaveBeenCalled()
  })
})
