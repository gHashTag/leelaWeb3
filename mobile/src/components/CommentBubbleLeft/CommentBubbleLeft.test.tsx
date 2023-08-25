import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import { CommentBubbleLeft } from './CommentBubbleLeft'

describe('CommentBubbleLeft Component', () => {
  const mockPost = {
    id: 123, // Add id property
    createTime: 1628779200000,
    liked: ['user456'],
    comments: [], // Add comments property
    ownerId: 'user123', // Add ownerId property
    text: 'Test comment text',
    plan: 1,
    accept: true,
  }
  const mockFullName = 'John Doe'
  const mockAvatar = 'avatar-url'
  const mockDate = '2023-08-12'
  const mockHandleProfile = jest.fn()
  const mockOnPress = jest.fn()

  it('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <CommentBubbleLeft
        post={mockPost}
        fullName={mockFullName}
        avatar={mockAvatar}
        date={mockDate}
        handleProfile={mockHandleProfile}
        onPress={mockOnPress}
      />,
    )

    const commentBubbleContainer = getByTestId('comment-bubble-left-container')
    const commentText = getByText('Test comment text')
    const fullName = getByText('John Doe')
    const date = getByText('2023-08-12')

    // Check if the component renders
    expect(commentBubbleContainer).toBeTruthy()

    // Check if the post text renders
    expect(commentText).toBeTruthy()

    // Check if the full name renders
    expect(fullName).toBeTruthy()

    // Check if the date renders
    expect(date).toBeTruthy()

    // Simulate press on the component
    fireEvent.press(commentBubbleContainer)

    // Check if the onPress callback was called
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })
})
