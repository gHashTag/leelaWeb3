import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from 'types'

const useTypedNavigation = useNavigation<NavigationProp<RootStackParamList>>
export { useTypedNavigation }
