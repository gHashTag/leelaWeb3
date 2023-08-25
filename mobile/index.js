/**
 * @format
 */
import '@env'
import 'react-native-get-random-values'
import '@ethersproject/shims' //for ethers.js https://dev.to/gate3/tutorial-setting-up-a-web3-react-native-dapp-96

import { AppRegistry } from 'react-native'

// import { LogBox } from 'react-native'

import './src/i18n'
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import { name as appName } from './app.json'
import App from './src'

// if (__DEV__) {
//   const ignoreWarns = ['i18next::translator:']

//   const warn = console.warn
//   console.warn = (...arg) => {
//     for (const warning of ignoreWarns) {
//       if (arg[0].startsWith(warning)) {
//         return
//       }
//     }
//     warn(...arg)
//   }

//   LogBox.ignoreLogs(ignoreWarns)
// }

// const App = () => {
//   useEffect(() => {
//     const w = ethers.Wallet.createRandom()
//     console.log({ walletObject: w, mnemonic: w.mnemonic })
//   }, [])
// }

AppRegistry.registerComponent(appName, () => App)
