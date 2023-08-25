import React, { useState, useEffect } from 'react'

import { Platform, View, StyleSheet } from 'react-native'

import { useMutation } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import {
  MarkdownView,
  Button,
  TextInputField,
  Space,
  Text,
  Background,
  KeyboardContainer,
  Layout,
} from 'components'
import { captureException, getSystemLanguage, navigate, red } from 'cons'
import { CREATE_REPORT_MUTATION } from 'graph'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { readFileAssets } from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import { RootStackParamList } from 'types'

interface FormData {
  title: string
}

type PlanScreenRouteProp = RouteProp<RootStackParamList, 'PLAN_SCREEN'>

type PlanScreenProps = {
  route: PlanScreenRouteProp
}

const PlanScreen: React.FC<PlanScreenProps> = ({ route }) => {
  const { key } = route.params

  const [createReportMutation, { loading, error }] = useMutation(
    CREATE_REPORT_MUTATION,
  )

  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit = async (data: FormData) => {
    const options = {
      title: data.title,
      rallyAccount: '0x61715aE5947Bdc45f4853639d1a48962051622d5',
      plan: 9,
    }
    await createReportMutation({ variables: { input: options } })
    navigate('REPORTS_SCREEN')
  }

  const [markdown, setMarkdown] = useState('')
  const systemLanguage = getSystemLanguage()

  useEffect(() => {
    if (Platform.OS === 'android') {
      const assetPath = `locales/${systemLanguage}/${key}-${systemLanguage}.md`
      readFileAssets(assetPath, 'utf8')
        .then((data) => {
          setMarkdown(data)
        })
        .catch((err) => {
          captureException(err, 'Error reading resource')
        })
    } else if (Platform.OS === 'ios') {
      const pathToFile =
        RNFetchBlob.fs.dirs.MainBundleDir + `/${key}-${systemLanguage}.md`

      RNFetchBlob.fs
        .readFile(pathToFile, 'utf8')
        .then((data) => {
          setMarkdown(data)
        })
        .catch((err) => {
          captureException(err, 'Error reading resource')
        })
    }
  }, [key, systemLanguage])

  return (
    <Background>
      <Layout loading={loading} error={error}>
        <MarkdownView markdown={markdown}>
          <KeyboardContainer>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInputField
                  placeholder={t('online-part.notReported')}
                  multiline
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  isWide
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: t('requireField'),
                },
              }}
            />
          </KeyboardContainer>
          <Space height={20} />
          <View style={styles.btnStyle}>
            {errors.title && (
              <>
                <Text
                  h={'h3'}
                  title={String(errors.title.message)}
                  oneColor={red}
                />
                <Space height={15} />
              </>
            )}

            <Button
              title={t('online-part.report')}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          <Space height={150} />
        </MarkdownView>
      </Layout>
    </Background>
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
  },
})

export { PlanScreen }
