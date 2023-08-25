import React from 'react'

import { FlatList, StyleSheet, View } from 'react-native'

import { useMutation } from '@apollo/client'
import { RouteProp } from '@react-navigation/native'
import {
  Space,
  ReportCard,
  CommentBubbleLeft,
  Background,
  KeyboardContainer,
  TextInputField,
  Text,
  Button,
  Layout,
} from 'components'
import { red } from 'cons'
import { CREATE_COMMENT_MUTATION } from 'graph'
import { useGlobalBackground } from 'hooks'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { s, vs } from 'react-native-size-matters'
import { Comment, RootStackParamList } from 'types' // Импортируйте необходимые типы

interface ReportScreenProps {
  route: RouteProp<RootStackParamList, 'REPORT_SCREEN'>
}

interface FormData {
  title: string
}

const ReportScreen: React.FC<ReportScreenProps> = ({ route }) => {
  const backgroundStyle = useGlobalBackground()
  const { t } = useTranslation()
  const { item } = route.params
  console.log('item.id', item.id)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const [createCommentMutation, { loading, error }] = useMutation(
    CREATE_COMMENT_MUTATION,
  )

  const onSubmit = async (data: FormData) => {
    const options = {
      title: data.title,
      reportId: item.id,
    }
    await createCommentMutation({ variables: { input: options } })
  }

  const header = () => {
    return (
      <Background isFlatList>
        <Space height={20} />
        <ReportCard {...item} />
        <Space height={20} />
      </Background>
    )
  }

  const footer = () => {
    return (
      <>
        <Space height={s(20)} />
        <KeyboardContainer>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInputField
                placeholder={t('input.comment')}
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
            h={'h2'}
            title={t('comment')}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <Space height={s(200)} />
      </>
    )
  }
  const renderItem = ({ item: commentItem }: { item: Comment }) => {
    return (
      <>
        <Space height={vs(10)} />
        <CommentBubbleLeft
          commentItem={commentItem}
          handleProfile={() => console.log('click')}
        />
      </>
    )
  }

  return (
    <Layout loading={loading} error={error}>
      <FlatList
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        ListHeaderComponentStyle={styles.headerStyle}
        data={item.comments || []}
        renderItem={renderItem}
        keyExtractor={(it) => it.id.toString()}
        contentContainerStyle={[backgroundStyle, styles.contentContainer]}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
  },
  contentContainer: {
    maxWidth: '100%',
  },
  headerStyle: { marginBottom: 15 },
})

export { ReportScreen }
