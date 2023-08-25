import React from 'react'

import { Display, Space, Background, Button, Dice } from 'components'
import { navigate } from 'cons'
import { useLeelaGame } from 'hooks'
import { useTranslation } from 'react-i18next'

const WelcomeScreen: React.FC = () => {
  const { t } = useTranslation()
  const { rollDice, lastRoll } = useLeelaGame()

  return (
    <Background>
      <Space height={50} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
      <Space height={50} />
      <Display title={t('welcome')} />
      <Space height={80} />
      <Button
        h={'h2'}
        title={t('withStart')}
        onPress={() =>
          navigate('PLAYER_SCREEN', { oldPlan: 68, isStartGame: true })
        }
      />
      <Space height={30} />
      <Button
        h={'h2'}
        title={t('continue')}
        onPress={() => navigate('CONTINUE_SCREEN')}
      />
    </Background>
  )
}

export { WelcomeScreen }
