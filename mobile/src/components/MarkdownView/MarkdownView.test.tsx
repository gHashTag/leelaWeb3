import React from 'react'

import { View } from 'react-native'

import { render } from '@testing-library/react-native'
import renderer from 'react-test-renderer'

import { MarkdownView } from './MarkdownView'

describe('MarkdownView Component', () => {
  const mockMarkdown =
    '## Heading 2\n\nThis is some **bold** and *italic* text.\n\n- Item 1\n- Item 2\n- Item 3'
  const mockChildren = <View testID="mock-children" />

  it('matches snapshot', () => {
    const tree = renderer
      .create(<MarkdownView markdown={mockMarkdown} children={mockChildren} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <MarkdownView markdown={mockMarkdown} children={mockChildren} />,
    )

    const markdownHeading = getByText('Heading 2')
    const boldText = getByText('bold')
    const italicText = getByText('italic')
    const item1 = getByText('Item 1')
    const item2 = getByText('Item 2')
    const item3 = getByText('Item 3')
    const childrenView = getByTestId('mock-children')

    // Check if the markdown content renders
    expect(markdownHeading).toBeTruthy()
    expect(boldText).toBeTruthy()
    expect(italicText).toBeTruthy()
    expect(item1).toBeTruthy()
    expect(item2).toBeTruthy()
    expect(item3).toBeTruthy()

    // Check if the children view renders
    expect(childrenView).toBeTruthy()
  })
})
