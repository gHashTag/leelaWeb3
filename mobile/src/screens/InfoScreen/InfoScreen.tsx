import React from 'react'

import { Display, Space, Background, Button } from 'components'
import { navigate } from 'cons'
import { useTranslation } from 'react-i18next'

const InfoScreen: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Background>
      <Space height={50} />

      <Display title={t('welcome')} />

      <Space height={30} />
      <Button
        h={'h2'}
        title={t('continue')}
        onPress={() => navigate('CONTINUE_SCREEN')}
      />
    </Background>
  )
}

export { InfoScreen }
