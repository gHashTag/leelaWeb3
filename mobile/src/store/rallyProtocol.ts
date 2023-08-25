import { makeVar, useReactiveVar } from '@apollo/client'

export const accountVar = makeVar<string | undefined>(undefined)

export const balanceVar = makeVar<number | undefined>(undefined)

// HOOKS

export const userDetailsVar = makeVar<
  { name: string; username: string } | undefined
>(undefined)

export const errorMessageVar = makeVar<
  { title: string; body: string } | undefined
>(undefined)

type SetAccountFunction = (newAccount: string | undefined) => void

export function useAccount(): [string | undefined, SetAccountFunction] {
  const account = useReactiveVar(accountVar)
  const setAccount: SetAccountFunction = (newAccount) => accountVar(newAccount)

  return [account, setAccount]
}

export function useBalance() {
  const balance = useReactiveVar(balanceVar)
  const setBalance = (newBalance: number | undefined) => balanceVar(newBalance)

  return [balance, setBalance]
}

export function useUserDetails() {
  const userDetails = useReactiveVar(userDetailsVar)
  const setUserDetails = (
    newUserDetails: { name: string; username: string } | undefined,
  ) => userDetailsVar(newUserDetails)

  return [userDetails, setUserDetails]
}

export function useErrorMessage() {
  const errorMessage = useReactiveVar(errorMessageVar)
  const setErrorMessage = (
    newErrorMessage: { title: string; body: string } | undefined,
  ) => errorMessageVar(newErrorMessage)

  return [errorMessage, setErrorMessage]
}
