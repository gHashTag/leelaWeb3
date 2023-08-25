import React, { useEffect } from 'react'

import { StyleSheet } from 'react-native'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { RALLY_API_KEY, SENTRY_DSN } from '@env'
import { RlyMumbaiNetwork, Network } from '@rly-network/mobile-sdk'
import * as Sentry from '@sentry/react-native'
import { ContractFactory, ethers } from 'ethers'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import VersionInfo from 'react-native-version-info'
import { RecoilRoot } from 'recoil'

import Navigation from './Navigation'

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

export const RlyNetwork: Network = RlyMumbaiNetwork
RlyNetwork.setApiKey(RALLY_API_KEY)

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

Sentry.init({
  dsn: SENTRY_DSN,
  release: `leela@${VersionInfo.appVersion}.${VersionInfo.buildVersion}`,
  tracesSampleRate: 0.2,
  integrations: [
    new Sentry.ReactNativeTracing({
      tracingOrigins: ['localhost', /^\//],
      routingInstrumentation,
    }),
  ],
  enabled: process.env.NODE_ENV !== 'development',
})

function AppWithProviders() {
  useEffect(() => {
    const w = ethers.Wallet.createRandom()
    console.log({ walletObject: w, mnemonic: w.mnemonic })
  }, [])

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.flexOne}>
        <RecoilRoot>
          <ApolloProvider client={client}>
            <Navigation />
          </ApolloProvider>
        </RecoilRoot>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
})

export default Sentry.wrap(AppWithProviders)
