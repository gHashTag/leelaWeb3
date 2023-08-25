import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import { ActionButtons } from './ActionButtons'
const isLiked = false

describe('ActionButtons Component', () => {
  it('renders admin menu button if isAdmin is true', () => {
    const handleAdminMenu = jest.fn()
    const { getByTestId } = render(
      <ActionButtons
        isAdmin={true}
        commCount={5}
        likeCount={10}
        handleAdminMenu={handleAdminMenu}
        handleComment={() => {}}
        handleLike={() => {}}
        handleShareLink={() => {}}
        isLiked={isLiked}
      />,
    )
    const adminMenuButton = getByTestId('admin-menu-button')
    expect(adminMenuButton).toBeTruthy()
  })

  it('renders comment and like buttons', () => {
    const { getByTestId } = render(
      <ActionButtons
        isAdmin={false}
        commCount={5}
        likeCount={10}
        handleAdminMenu={() => {}}
        handleComment={() => {}}
        handleLike={() => {}}
        isLiked={isLiked}
        handleShareLink={() => {}}
      />,
    )
    const commentButton = getByTestId('comment-button')
    const heart = isLiked ? 'heart' : 'heart-outline'
    const likeButton = getByTestId(heart)
    expect(commentButton).toBeTruthy()
    expect(likeButton).toBeTruthy()
  })

  it('calls handleAdminMenu when admin menu button is pressed', () => {
    const handleAdminMenu = jest.fn()
    const { getByTestId } = render(
      <ActionButtons
        isAdmin={true}
        commCount={5}
        likeCount={10}
        handleAdminMenu={handleAdminMenu}
        handleComment={() => {}}
        handleLike={() => {}}
        handleShareLink={() => {}}
        isLiked={isLiked}
      />,
    )
    const adminMenuButton = getByTestId('admin-menu-button')
    fireEvent.press(adminMenuButton)
    expect(handleAdminMenu).toHaveBeenCalled()
  })

  it('calls handleComment when comment button is pressed', () => {
    const handleComment = jest.fn()
    const { getByTestId } = render(
      <ActionButtons
        isAdmin={false}
        commCount={5}
        likeCount={10}
        handleAdminMenu={() => {}}
        handleComment={handleComment}
        handleLike={() => {}}
        isLiked={isLiked}
        handleShareLink={() => {}}
      />,
    )
    const commentButton = getByTestId('comment-button')
    fireEvent.press(commentButton)
    expect(handleComment).toHaveBeenCalled()
  })

  it('calls handleLike when like button is pressed', () => {
    const handleLike = jest.fn()
    const { getByTestId } = render(
      <ActionButtons
        isAdmin={false}
        commCount={5}
        likeCount={10}
        handleAdminMenu={() => {}}
        handleComment={() => {}}
        handleLike={handleLike}
        isLiked={isLiked}
        handleShareLink={() => {}}
      />,
    )
    const heart = isLiked ? 'heart' : 'heart-outline'
    const likeButton = getByTestId(heart)
    fireEvent.press(likeButton)
    expect(handleLike).toHaveBeenCalled()
  })
})
