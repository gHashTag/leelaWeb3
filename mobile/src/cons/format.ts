type AccountHumanReadable = {
  short: string
  full: string
}

export const accountHumanReadable = (
  rlyAccount: string,
): AccountHumanReadable => {
  if (!rlyAccount) {
    return {
      short: '',
      full: '',
    }
  }

  const firstChars = rlyAccount.slice(0, 5)
  const lastChars = rlyAccount.slice(rlyAccount.length - 9, rlyAccount.length)

  return {
    short: `${firstChars}...${lastChars}`,
    full: rlyAccount,
  }
}
