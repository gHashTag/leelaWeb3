import { renderHook, act } from '@testing-library/react-hooks'
import i18next from 'i18next'
// @ts-ignore
import MockAsyncStorage from 'mock-async-storage'

import { GEM_ICONS } from './images'
import { useLeelaGame } from './useLeelaGame'

const mockAsyncStorage = new MockAsyncStorage()
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

mockAsyncStorage.setItem = jest.fn()

describe('useLeelaGame', () => {
  beforeEach(() => {
    mockAsyncStorage.clear()
  })

  it('should initialize state correctly', async () => {
    const initialState = {
      currentPlayer: {
        id: 1,
        plan: 68,
        previousPlan: 68,
        isStart: false,
        isFinished: false,
        consecutiveSixes: 0,
        message: i18next.t('sixToBegin'),
        positionBeforeThreeSixes: 0,
        avatar: GEM_ICONS[1],
      },
      lastRoll: 1,
      rollHistory: [],
      planHistory: [68],
    }

    // Mock AsyncStorage.getItem
    mockAsyncStorage.setItem('leelaGameState', JSON.stringify(initialState))
    mockAsyncStorage.getItem = jest
      .fn()
      .mockResolvedValue(JSON.stringify(initialState))

    const { result, waitForNextUpdate } = renderHook(() => useLeelaGame())

    // Call the function that triggers state change
    act(() => {
      result.current.rollDice()
    })

    // Wait for the next update
    await waitForNextUpdate()

    expect(result.current.currentPlayer).toMatchObject(
      initialState.currentPlayer,
    )
    expect(result.current.rollHistory).toEqual(initialState.rollHistory)
    expect(result.current.planHistory).toEqual(initialState.planHistory)
  })

  // Test other scenarios similarly
})
