import React from 'react'

import { FlatList, StyleSheet } from 'react-native'

import { useQuery } from '@apollo/client'
import { Space, ReportCard, Layout, Display } from 'components'
import { W } from 'cons'
import { navigate } from 'cons/navigation'
import { GET_ALL_REPORTS_QUERY } from 'graph'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'store'
import { Report, Like } from 'types'

const ReportsScreen: React.FC = () => {
  const [account] = useAccount()
  const isCurrentUserLike = (like: Like) => like.player.id === account
  const { t } = useTranslation()
  const { loading, error, data } = useQuery(GET_ALL_REPORTS_QUERY)

  const onPress = (item: Report) => {
    navigate('REPORT_SCREEN', { item })
  }
  const renderItem = ({ item }: { item: Report }) => (
    <>
      <ReportCard {...item} onPress={() => onPress(item)} />
      <Space height={20} />
    </>
  )

  const header = () => (
    <>
      <Display
        title={t('nextStep', {
          date: 24,
        })}
        height={60}
        width={W - 45}
      />
      <Space height={20} />
    </>
  )

  const reportsWithCommentCount: Report[] =
    data?.getAllReports.map((report: Report) => ({
      ...report,
      commentCount: report?.comments?.length || 0,
      isLikedByCurrentUser: report?.likes?.some(isCurrentUserLike) || false,
      likeCount: report?.likes?.length || 0,
    })) || []

  return (
    <Layout loading={loading} error={error}>
      <FlatList
        ListHeaderComponent={header}
        data={reportsWithCommentCount}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    width: W,
  },
})

export { ReportsScreen }
