import { createAccount, getAccount } from '@rly-network/mobile-sdk'
import { captureException } from 'cons'
import { PlayerInput } from 'types'

export const createOrUpdatePlayer = async (
  playerInput: PlayerInput,
  account: string | undefined,
  createPlayerMutation: (input: PlayerInput) => Promise<any>,
  setAccountFn: (account: string) => void,
  setProfileData: (data: any) => void,
) => {
  try {
    if (!account) {
      await createAccount()
      const rallyAccount = await getAccount()
      if (rallyAccount !== undefined) {
        setAccountFn(rallyAccount)
        const { data } = await createPlayerMutation({
          rallyAccount,
          fullName: playerInput.fullName,
          avatar: playerInput.avatar,
          intention: playerInput.intention,
          email: playerInput.email,
          plan: 0,
          previousPlan: 0,
          isStart: false,
          isFinished: false,
          consecutiveSixes: 0,
          positionBeforeThreeSixes: 0,
        })
        setProfileData(data)
        return data
      }
    } else {
      // Обновление информации об игроке (аккаунт уже существует)
      const { data } = await createPlayerMutation({
        rallyAccount: account,
        fullName: playerInput.fullName,
        avatar: playerInput.avatar,
        intention: playerInput.intention,
        email: playerInput.email,
        plan: 0,
        previousPlan: 0,
        isStart: false,
        isFinished: false,
        consecutiveSixes: 0,
        positionBeforeThreeSixes: 0,
      })
      setProfileData(data)
      return data
    }
  } catch (error) {
    captureException(error, 'Error creating/updating player')
    throw error // Re-throw the error to handle it in the calling code
  }
}
