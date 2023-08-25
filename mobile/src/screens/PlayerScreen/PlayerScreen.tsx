import React, { useEffect } from 'react'

import { Linking, View, StyleSheet } from 'react-native'

import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { RouteProp } from '@react-navigation/native'
import {
  Space,
  TextInputField,
  Avatar,
  Button,
  Background,
  Address,
  ErrorMessages,
  Layout,
  KeyboardContainer,
} from 'components'
import { navigate } from 'cons'
import { CREATE_PLAYER_MUTATION, GET_PLAYER_BY_ID_QUERY } from 'graph'
import { useChooseAvatarImage, useProfile } from 'hooks'
import _ from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'store'
import { PlayerInput, RootStackParamList } from 'types'
import * as Yup from 'yup'

import { createOrUpdatePlayer } from './createOrUpdatePlayer'

interface FormData {
  fullName: string
  email: string
  intention: string
}

const validationFieldNames = {
  fullName: 'fullName',
  email: 'email',
  intention: 'intention',
}

interface PlayerScreenProps {
  route: RouteProp<RootStackParamList, 'PLAYER_SCREEN'>
}

const PlayerScreen: React.FC<PlayerScreenProps> = ({ route }) => {
  const { oldPlan = 68, isStartGame = false } = route?.params
  const { t } = useTranslation()

  const [account, setAccount] = useAccount()

  const [createPlayerMutation] = useMutation(CREATE_PLAYER_MUTATION)

  const { loading, error, data } = useQuery(GET_PLAYER_BY_ID_QUERY, {
    variables: {
      playerId: account,
    },
  })

  const { avatar, chooseAvatarImage, isLoading, setAvatar } =
    useChooseAvatarImage()

  const [profileData, setProfileData] = useProfile()

  const schema = Yup.object().shape({
    fullName: Yup.string().required(
      t('required', { field: t(validationFieldNames.fullName) }),
    ),
    email: Yup.string()
      .required(t('required', { field: t(validationFieldNames.email) }))
      .email(t('email')),
    intention: Yup.string().required(
      t('required', { field: t(validationFieldNames.intention) }),
    ),
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      intention: '',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (data && data.getPlayer) {
      const { fullName, email, intention } = data.getPlayer
      setValue('fullName', fullName)
      setValue('email', email)
      setValue('intention', intention)
      setAvatar(data.getPlayer.avatar)
    }
  }, [data, setValue, setAvatar])

  const onSubmit = _.debounce(async (item) => {
    const playerInput: PlayerInput = {
      rallyAccount: '',
      fullName: item.fullName,
      avatar: avatar || profileData.createPlayer.avatar,
      intention: item.intention,
      email: item.email,
      plan: 0,
      previousPlan: 0,
      isStart: false,
      isFinished: false,
      consecutiveSixes: 0,
      positionBeforeThreeSixes: 0,
    }

    await createOrUpdatePlayer(
      playerInput,
      account,
      (options) => createPlayerMutation({ variables: { input: options } }),
      setAccount,
      setProfileData,
    )

    navigate('GAME_SCREEN')
  }, 1000)

  const plan =
    oldPlan !== undefined ? oldPlan : profileData?.createPlayer?.plan || 68

  return (
    <Background isScrollView>
      <Layout loading={loading} error={error}>
        <View style={styles.container}>
          <Space height={20} />
          <Avatar
            plan={plan}
            size="xLarge"
            avatar={avatar || profileData?.createPlayer?.avatar || ''}
            isAccept={false}
            showIcon={false}
            onPress={chooseAvatarImage}
            isLoading={isLoading}
          />
          <Space height={10} />
          {account && <Address rlyAccount={account} />}

          <Space height={25} />
          <KeyboardContainer>
            <Controller
              control={control}
              rules={{ required: true }}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputField
                  placeholder={t('auth.fullName')}
                  multiline
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Space height={10} />

            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputField
                  placeholder={t('auth.email')}
                  multiline
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  inputMode="email"
                  keyboardType="email-address"
                />
              )}
            />
            <Space height={20} />
            <Controller
              control={control}
              name="intention"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputField
                  placeholder={t('intention')}
                  multiline
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </KeyboardContainer>
          <Space height={20} />

          <View style={styles.btnStyle}>
            <ErrorMessages errors={errors} />
            <Space height={5} />
          </View>
          <Space height={5} />
          <Button h={'h2'} title={t('save')} onPress={handleSubmit(onSubmit)} />
          {account && !isStartGame && (
            <>
              <Space height={20} />
              <Button
                h={'h2'}
                title="Explorer"
                onPress={async () => {
                  Linking.openURL(
                    `https://mumbai.polygonscan.com/address/${account}`,
                  )
                }}
              />
              <Space height={20} />
              <Button
                h={'h2'}
                title="View seed"
                onPress={() => navigate('SEED_SCREEN')}
              />
            </>
          )}

          <Space height={150} />
        </View>
      </Layout>
    </Background>
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export { PlayerScreen }
