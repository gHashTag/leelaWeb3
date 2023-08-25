import React from 'react'

import { Image } from 'react-native'

import { render, waitFor } from '@testing-library/react-native'
import { Player } from 'types'

import { GameBoard } from '../'

const players: Player[] = [
  {
    id: 2,
    plan: 72,
    avatar: 106,
  },
  {
    id: 4,
    plan: 34,
    avatar:
      'https://bafkreiftrmfmimlvo26xaxfvt2ypnjjaavq5mgnkjljs6mczfekii4cmtq.ipfs.nftstorage.link/',
  },
]

describe('GameBoard Component', () => {
  it('should render correct player avatars', async () => {
    const { queryByTestId } = render(<GameBoard players={players} />)

    await waitFor(() => {
      players.forEach((player) => {
        const playerGemImage = queryByTestId(`gem-${player.id}`)
        expect(playerGemImage).toBeTruthy()

        if (typeof player.avatar === 'string') {
          expect(playerGemImage?.findByType(Image)?.props?.source?.uri).toEqual(
            player.avatar,
          )
        }
      })
    })
  })

  it('should render the correct number of Gem components based on the players prop', () => {
    const { getAllByTestId } = render(<GameBoard players={players} />)
    const gemComponents = getAllByTestId('gem-container')
    const playerGemImages = getAllByTestId('player-gem-image')
    expect(playerGemImages.length).toEqual(2) // Проверка на 2 игрока
    expect(gemComponents.length).toEqual(72) // Проверка на общее количество компонентов Gem
  })

  it('should render player avatars', () => {
    const { getByTestId } = render(<GameBoard players={players} />)

    players.forEach((player) => {
      const gemImage = getByTestId(`gem-${player.id}`)
      expect(gemImage).toBeTruthy()
    })
  })
})
