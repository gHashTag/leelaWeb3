import { useTheme } from '@react-navigation/native'
import { black, lightGray } from 'cons'

const useGlobalBackground = () => {
  const { dark } = useTheme()
  const backgroundColor = dark ? black : lightGray

  const backgroundStyle = [{ backgroundColor }]

  return backgroundStyle
}

export { useGlobalBackground }
