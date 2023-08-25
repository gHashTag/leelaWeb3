import React from 'react'

import { ActivityIndicator } from 'react-native'

import { secondary } from 'cons'

interface LoaderProps {
  size?: 'small' | 'large'
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
  return <ActivityIndicator size={size || 'small'} color={secondary} />
}

export { Loader }
