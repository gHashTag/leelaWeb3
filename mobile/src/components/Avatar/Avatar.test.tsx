import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'
import renderer from 'react-test-renderer'

import '@testing-library/jest-native/extend-expect'
import { Avatar } from './Avatar'

describe('Avatar Component', () => {
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <Avatar
          plan={5}
          size="medium"
          avatar="avatar-url"
          testID="avatar-component"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Avatar
        plan={5}
        size="medium"
        avatar="avatar-url"
        testID="avatar-component"
      />,
    )
    expect(getByTestId('avatar-component')).toBeTruthy()
  })

  it('calls onPress function when pressed', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <Avatar
        plan={5}
        size="medium"
        avatar="avatar-url"
        onPress={onPressMock}
        testID="avatar-component"
      />,
    )
    const avatarComponent = getByTestId('avatar-component')
    fireEvent.press(avatarComponent)
    expect(onPressMock).toHaveBeenCalled()
  })

  it('displays time icon when isAccept is false', () => {
    const { queryByTestId } = render(
      <Avatar
        plan={5}
        size="medium"
        avatar="avatar-url"
        isAccept={false}
        testID="avatar-component"
      />,
    )
    expect(queryByTestId('avatar-title')).toBeNull()
    expect(queryByTestId('time-icon')).toBeTruthy()
  })

  it('displays text title when isAccept is true', () => {
    const { queryByTestId } = render(
      <Avatar
        plan={5}
        size="medium"
        avatar="avatar-url"
        isAccept={true}
        testID="avatar-component"
      />,
    )
    expect(queryByTestId('avatar-title')).toBeTruthy()
    expect(queryByTestId('avatar-title')).toHaveTextContent('05')
  })
})
