import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import { ReportCard } from './ReportCard'

describe('ReportCard', () => {
  const mockProps = {
    id: '1',
    post: {
      id: 1,
      plan: 1,
      accept: true,
      text: 'Test post text',
      createTime: 1678840800000,
      liked: [],
      comments: [],
      ownerId: 'user1',
    },
    onPress: jest.fn(),
    fullName: 'John Doe',
    avatar: 'avatar.png',
    isAdmin: true,
    isLiked: false,
    likeCount: 10,
    commCount: 5,
    date: '2023-08-12',
    handleProfile: jest.fn(),
    handleAdminMenu: jest.fn(),
    handleShareLink: jest.fn(),
    handleLike: jest.fn(),
    handleComment: jest.fn(),
  }

  it('should render correctly', () => {
    const { getByTestId } = render(<ReportCard {...mockProps} />)
    const card = getByTestId('report-card')
    expect(card).toBeDefined()
  })

  it('should call onPress when pressed', () => {
    const { getByTestId } = render(<ReportCard {...mockProps} />)
    const card = getByTestId('report-card')
    fireEvent.press(card)
    expect(mockProps.onPress).toHaveBeenCalledTimes(1)
  })

  it('should call handleProfile when avatar is pressed', () => {
    const { getByTestId } = render(<ReportCard {...mockProps} />)
    const avatar = getByTestId('report-card-avatar')
    fireEvent.press(avatar)
    expect(mockProps.handleProfile).toHaveBeenCalledTimes(1)
  })
})
