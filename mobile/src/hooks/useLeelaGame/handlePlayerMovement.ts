import i18next from 'i18next'
import { Player } from 'types'

const MAX_ROLL = 6
const TOTAL_PLANS = 72
const WIN_PLAN = 68

const handleToMove = (
  name: string,
  updatedPlayer: Player,
  newPlan: number,
  to: number,
  roll: number,
): Player => {
  const updatedMessage = i18next.t(name, {
    currentPlayer: updatedPlayer.id,
    from: newPlan,
    to: to,
    roll,
  })
  return {
    ...updatedPlayer,
    message: updatedMessage,
    plan: to,
  }
}

const handlePlayerMovement = (updatedPlayer: Player, roll: number): Player => {
  if (!updatedPlayer.isStart) {
    if (roll !== MAX_ROLL) {
      const startMessage = i18next.t('sixToBegin')
      return {
        ...updatedPlayer,
        message: startMessage,
      }
    } else {
      const updatedMessage = i18next.t('moveAfterSix', {
        currentPlayer: updatedPlayer.id,
      })
      return {
        ...updatedPlayer,
        plan: MAX_ROLL,
        isStart: true,
        consecutiveSixes: 1,
        message: updatedMessage,
      }
    }
  }

  let newPlan = updatedPlayer.plan + roll

  if (newPlan > TOTAL_PLANS) {
    const updatedMessage = i18next.t('stay', {
      currentPlayer: updatedPlayer.id,
      roll,
    })
    return {
      ...updatedPlayer,
      message: updatedMessage,
    }
  } else if (newPlan === 12) {
    return handleToMove('snakes', updatedPlayer, newPlan, 8, roll)
  } else if (newPlan === 16) {
    return handleToMove('snakes', updatedPlayer, newPlan, 4, roll)
  } else if (newPlan === 24) {
    return handleToMove('snakes', updatedPlayer, newPlan, 7, roll)
  } else if (newPlan === 29) {
    return handleToMove('snakes', updatedPlayer, newPlan, 6, roll)
  } else if (newPlan === 44) {
    return handleToMove('snakes', updatedPlayer, newPlan, 9, roll)
  } else if (newPlan === 52) {
    return handleToMove('snakes', updatedPlayer, newPlan, 35, roll)
  } else if (newPlan === 55) {
    return handleToMove('snakes', updatedPlayer, newPlan, 3, roll)
  } else if (newPlan === 61) {
    return handleToMove('snakes', updatedPlayer, newPlan, 13, roll)
  } else if (newPlan === 63) {
    return handleToMove('snakes', updatedPlayer, newPlan, 2, roll)
  } else if (newPlan === 72) {
    return handleToMove('snakes', updatedPlayer, newPlan, 51, roll)
  } else if (newPlan === 10) {
    return handleToMove('arrows', updatedPlayer, newPlan, 23, roll)
  } else if (newPlan === 17) {
    return handleToMove('arrows', updatedPlayer, newPlan, 69, roll)
  } else if (newPlan === 20) {
    return handleToMove('arrows', updatedPlayer, newPlan, 32, roll)
  } else if (newPlan === 22) {
    return handleToMove('arrows', updatedPlayer, newPlan, 60, roll)
  } else if (newPlan === 27) {
    return handleToMove('arrows', updatedPlayer, newPlan, 41, roll)
  } else if (newPlan === 28) {
    return handleToMove('arrows', updatedPlayer, newPlan, 50, roll)
  } else if (newPlan === 37) {
    return handleToMove('arrows', updatedPlayer, newPlan, 66, roll)
  } else if (newPlan === 45) {
    return handleToMove('arrows', updatedPlayer, newPlan, 67, roll)
  } else if (newPlan === 46) {
    return handleToMove('arrows', updatedPlayer, newPlan, 62, roll)
  } else if (newPlan === 54 || newPlan === WIN_PLAN) {
    const updatedMessage = i18next.t('finish', {
      currentPlayer: updatedPlayer.id,
    })
    return {
      ...updatedPlayer,
      plan: newPlan,
      previousPlan: newPlan,
      isFinished: true,
      isStart: false,
      message: updatedMessage,
    }
  } else {
    const updatedMessage = i18next.t('moveMessage', {
      currentPlayer: updatedPlayer.id,
      roll: roll,
      from: updatedPlayer.plan,
      to: newPlan,
    })
    return {
      ...updatedPlayer,
      plan: newPlan,
      message: updatedMessage,
    }
  }
}

export { handlePlayerMovement }
