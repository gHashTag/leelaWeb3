import React from 'react'

import { StyleSheet, View } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Display,
  Space,
  Background,
  Button,
  Dice,
  TextInputField,
  ErrorMessages,
  KeyboardContainer,
} from 'components'
import { navigate } from 'cons'
import { useLeelaGame } from 'hooks'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

interface FormData {
  planNumber: string
}

const ContinueScreen: React.FC = () => {
  const { t } = useTranslation()
  const { rollDice, lastRoll } = useLeelaGame()
  const schema = Yup.object().shape({
    planNumber: Yup.string().required(t('required')),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      planNumber: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    const oldPlan = parseInt(data.planNumber, 10)
    navigate('PLAYER_SCREEN', { oldPlan })
  }

  return (
    <Background>
      <Space height={50} />
      <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
      <Space height={30} />
      <Display title={t('insertPlan')} />
      <Space height={40} />
      <KeyboardContainer>
        <Controller
          control={control}
          rules={{ required: true }}
          name="planNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              placeholder={t('insertPlanPlaceholder')}
              multiline
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </KeyboardContainer>
      <View style={styles.errorStyle}>
        <ErrorMessages errors={errors} />
        <Space height={5} />
      </View>
      <Button h={'h2'} title={t('start')} onPress={handleSubmit(onSubmit)} />
      <Space height={140} />
    </Background>
  )
}

const styles = StyleSheet.create({
  errorStyle: {
    alignItems: 'center',
  },
})

export { ContinueScreen }
