// @ts-ignore
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  transform: {
    ...tsjPreset.transform,
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': ['ts-jest', { babelConfig: true }],
    '\\.js$': '<rootDir>/jest/preprocessor.js',
    '^.+\\.mjs$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-size-matters|react-clone-referenced-element|@react-native/polyfills|react-native-spinkit|@sentry/react-native|react-native-rate|react-native-localize|@react-native-async-storage/async-storage|@react-navigation|@react-native/assets|@react-native/js-polyfills|@react-native-community/art))',
  ],
  moduleNameMapper: {
    '@env': '<rootDir>/__mocks__/@env.js',
  },
  cacheDirectory: '.jest/cache',
  useESM: true,
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
}
