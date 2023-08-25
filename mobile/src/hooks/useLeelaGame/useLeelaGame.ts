import { useEffect, useReducer } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { captureException } from 'cons'
import i18next from 'i18next'
import { Player } from 'types'

import { handlePlayerMovement } from './handlePlayerMovement'
import { GEM_ICONS } from './images'

const MAX_ROLL = 6

interface State {
  currentPlayer: Player
  lastRoll: number
  rollHistory: number[]
  planHistory: number[]
}

type Action =
  | { type: 'ROLL_DICE' }
  | { type: 'UPDATE_PLAYER'; player: Player }
  | { type: 'SET_ROLL_HISTORY'; rollHistory: number[] }
  | { type: 'SET_PLAN_HISTORY'; planHistory: number[] }
  | { type: 'SET_INITIAL_STATE'; initialState: State }

const initialState: State = {
  currentPlayer: {
    id: '1',
    plan: 68,
    previousPlan: 68,
    isStart: false,
    isFinished: false,
    consecutiveSixes: 0,
    fullName: 'Leela',
    message: i18next.t('sixToBegin'),
    positionBeforeThreeSixes: 0,
    avatar: GEM_ICONS[1],
  },
  lastRoll: 1,
  rollHistory: [],
  planHistory: [68],
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ROLL_DICE':
      const rollResult = Math.floor(Math.random() * MAX_ROLL) + 1
      return {
        ...state,
        lastRoll: rollResult,
        rollHistory: [...state.rollHistory, rollResult],
        currentPlayer: handlePlayerMovement(state.currentPlayer, rollResult),
      }
    case 'UPDATE_PLAYER':
      return {
        ...state,
        currentPlayer: action.player,
      }
    case 'SET_ROLL_HISTORY':
      return {
        ...state,
        rollHistory: action.rollHistory,
      }
    case 'SET_PLAN_HISTORY':
      return {
        ...state,
        planHistory: action.planHistory,
      }
    case 'SET_INITIAL_STATE':
      return action.initialState
    default:
      return state
  }
}

const useLeelaGame = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getSavedState = async () => {
    try {
      const savedState = await AsyncStorage.getItem('leelaGameState')
      return savedState ? JSON.parse(savedState) : initialState
    } catch (error) {
      captureException(error, 'getSavedState')
      return initialState
    }
  }

  useEffect(() => {
    getSavedState().then((savedState) => {
      dispatch({ type: 'SET_INITIAL_STATE', initialState: savedState })
    })
  }, [])

  // Подписка на изменения стейта и сохранение в AsyncStorage
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('leelaGameState', JSON.stringify(state))
      } catch (error) {
        captureException(error, 'saveState')
      }
    }

    saveState()
  }, [state])

  const rollDice = () => {
    dispatch({ type: 'ROLL_DICE' })
  }

  const updatePlayer = (player: Player) => {
    dispatch({ type: 'UPDATE_PLAYER', player })
  }

  const setRollHistory = (rollHistory: number[]) => {
    dispatch({ type: 'SET_ROLL_HISTORY', rollHistory })
  }

  const setPlanHistory = (planHistory: number[]) => {
    dispatch({ type: 'SET_PLAN_HISTORY', planHistory })
  }

  return {
    currentPlayer: state.currentPlayer,
    rollHistory: state.rollHistory,
    planHistory: state.planHistory,
    rollDice,
    lastRoll: state.lastRoll,
    updatePlayer,
    setRollHistory,
    setPlanHistory,
  }
}

export { useLeelaGame }
