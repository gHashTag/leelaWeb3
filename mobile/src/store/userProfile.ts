import { makeVar } from '@apollo/client'
import { ProfileData } from 'types'

export const avatarVar = makeVar<string | null>(null)

export const isLoadingAvatarVar = makeVar<boolean>(false)

export const profileDataVar = makeVar<ProfileData>({
  createPlayer: {
    id: '',
    plan: 68,
    fullName: '',
    email: '',
    intention: '',
    avatar: '',
    rallyAccount: '',
  },
})
