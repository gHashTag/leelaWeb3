import React, { useEffect, useState } from 'react'

import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native'

import { useQuery } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getAccount } from '@rly-network/mobile-sdk'
import * as Sentry from '@sentry/react'
import { Header, HeaderT } from 'components'
import {
  navigationRef,
  isReadyRef,
  navigate,
  LightTheme,
  DarkTheme,
} from 'cons/navigation'
import { GET_PLAYER_BY_ID_QUERY } from 'graph/query/GET_PLAYER_BY_ID_QUERY'
import { useProfile } from 'hooks'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { useAccount } from 'store'
import UiKit from 'UiKit'

import { black, lightGray, secondary, white } from './cons'
import {
  ContinueScreen,
  WelcomeScreen,
  GameScreen,
  PlanScreen,
  PlansScreen,
  ReportScreen,
  ReportsScreen,
  PlayerScreen,
  SeedPhraseScreen,
  InfoScreen,
} from './screens'
import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  const isDark = useColorScheme() === 'dark'

  const theme = isDark ? DarkTheme : LightTheme
  const color = isDark ? 'light-content' : 'dark-content'
  const [hasLoadedAccount, setHasLoadedAccount] = useState(false)
  const [account, setAccount] = useAccount()
  const [profileData, setProfileData] = useProfile()

  const { loading, error, data } = useQuery(GET_PLAYER_BY_ID_QUERY, {
    variables: {
      playerId: account,
    },
  })

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(
      isDark ? black : white,
      isDark ? 'dark' : 'light',
    )
    SystemNavigationBar.setNavigationBarDividerColor(lightGray)
    return () => {
      // @ts-ignore
      isReadyRef.current = false
    }
  }, [isDark])

  useEffect(() => {
    const loadAccount = async () => {
      const rlyAccount = await getAccount()
      setHasLoadedAccount(true)

      if (!rlyAccount) {
        navigate('GAME_SCREEN')
        return
      }
      setAccount(rlyAccount)
      if (loading) {
        setProfileData(data?.getPlayerById)
      }
    }
    loadAccount()
  }, [data?.getPlayerById, error, loading, setAccount, setProfileData])

  if (!hasLoadedAccount) {
    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          // @ts-ignore
          isReadyRef.current = true
        }}
        theme={theme}
      >
        <View style={styles.loadingScreenContainer}>
          <ActivityIndicator size="large" color={secondary} />
        </View>
      </NavigationContainer>
    )
  }

  const header = ({
    leftName,
    onPress,
    isStartGame,
    isCenterButton,
  }: HeaderT) => {
    const { avatar, plan } = profileData?.createPlayer ?? {}
    return (
      <Header
        avatar={avatar}
        plan={plan}
        leftName={leftName}
        onPress={onPress}
        isStartGame={isStartGame}
        isCenterButton={isCenterButton}
      />
    )
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // @ts-ignore
        isReadyRef.current = true
      }}
      theme={theme}
    >
      <StatusBar backgroundColor={isDark ? black : white} barStyle={color} />
      <Stack.Navigator
        initialRouteName="GAME_SCREEN"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group
          screenOptions={{
            headerShown: true,
            animation: 'fade',
            gestureEnabled: false,
          }}
        >
          <Stack.Screen
            name="WELCOME_SCREEN"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="INFO_SCREEN"
            component={InfoScreen}
            options={{
              header: () => header({}),
            }}
          />
          <Stack.Screen
            name="CONTINUE_SCREEN"
            component={ContinueScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GAME_SCREEN"
            component={GameScreen}
            options={{
              header: () =>
                header({
                  leftName: 'information',
                  onPress: () => navigate('INFO_SCREEN'),
                }),
            }}
          />
          <Stack.Screen
            name="PLANS_SCREEN"
            component={PlansScreen}
            options={{
              header: () => header({}),
            }}
          />
          <Stack.Screen
            name="PLAN_SCREEN"
            component={PlanScreen}
            options={{
              header: () => header({}),
            }}
          />
          <Stack.Screen
            name="REPORT_SCREEN"
            component={ReportScreen}
            options={{
              header: () => header({}),
            }}
          />
          <Stack.Screen
            name="REPORTS_SCREEN"
            component={ReportsScreen}
            options={{
              header: () =>
                header({
                  leftName: 'information',
                  onPress: () => navigate('INFO_SCREEN'),
                }),
            }}
          />
          <Stack.Screen name="UI_KIT_SCREEN" component={UiKit} />
          <Stack.Screen
            name="PLAYER_SCREEN"
            component={PlayerScreen}
            options={({ route }) => {
              const isStartGame = route.params?.isStartGame ?? false
              return {
                header: () =>
                  header({
                    leftName: 'information',
                    onPress: () => navigate('INFO_SCREEN'),
                    isStartGame: isStartGame,
                    isCenterButton: false,
                  }),
              }
            }}
          />
          <Stack.Screen name="SEED_SCREEN" component={SeedPhraseScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  loadingScreenContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export default Sentry.withProfiler(App)
