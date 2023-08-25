import React from 'react'

import { TextStyle } from 'react-native'

import { fireEvent, render } from '@testing-library/react-native'
import renderer from 'react-test-renderer'

import { Text, hT, textStyles } from './Text'

describe('Text Component', () => {
  it('Text component snapshot', () => {
    const component = renderer.create(
      <Text title="Snapshot Test" testID="snapshot-text" />,
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with default props', () => {
    const { getByText } = render(
      <Text testID="text-component" title="Test Title" />,
    )
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('applies the correct style based on the "h" prop', () => {
    const styles: hT[] = ['h0', 'h1', 'h2', 'h3', 'h4', 'h5']
    styles.forEach((style) => {
      const { getByTestId } = render(
        <Text testID="text-component" title="Test Title" h={style} />,
      )
      const receivedStyle = getByTestId('text-component').props.style
      expect(receivedStyle).toEqual(expect.objectContaining(textStyles[style]))
    })
  })

  it('should call the onPress function when pressed', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <Text
        title="Clickable Text"
        onPress={onPressMock}
        testID="clickable-text"
      />,
    )
    const clickableText = getByTestId('clickable-text')
    fireEvent.press(clickableText)
    expect(onPressMock).toHaveBeenCalled()
  })

  it('displays the correct title', () => {
    const title = 'Test Title'
    const { getByTestId } = render(
      <Text testID="text-component" title={title} />,
    )
    const textComponent = getByTestId('text-component')
    expect(textComponent.props.children).toBe(title)
  })

  it('displays truncated text when numberOfLines is set', () => {
    const longText = 'This is a very long text that should be truncated'
    const { getByTestId } = render(
      <Text testID="text-component" title={longText} numberOfLines={1} />,
    )
    const textComponent = getByTestId('text-component')
    expect(textComponent.props.children).toBe(longText)
  })

  it('applies additional custom styles', () => {
    const customStyle: TextStyle = { fontSize: 20, fontWeight: 'bold' }
    const { getByTestId } = render(
      <Text
        testID="text-component"
        title="Test Title"
        textStyle={customStyle}
      />,
    )
    const textComponent = getByTestId('text-component')
    const receivedStyle = textComponent.props.style
    expect(receivedStyle).toEqual(expect.objectContaining(customStyle))
  })
})
