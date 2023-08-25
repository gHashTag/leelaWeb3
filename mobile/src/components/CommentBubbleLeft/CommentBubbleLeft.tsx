import React from 'react'

import { View, Pressable, StyleSheet } from 'react-native'

import { Avatar, NeomorphFlexView, Space, Text } from 'components'
import { W, formatDate, transparent } from 'cons'
import { s, vs } from 'react-native-size-matters'
import { Comment } from 'types'

interface CommentBubbleLeftProps {
  commentItem: Comment
  handleProfile: () => void
}

const CommentBubbleLeft: React.FC<CommentBubbleLeftProps> = ({
  commentItem,
  handleProfile,
}) => {
  const { author, title, createdAt } = commentItem
  const { avatar, fullName, plan } = author
  return (
    <NeomorphFlexView marginHorizontal={20}>
      <View style={styles.container}>
        <Pressable testID="comment-bubble-left-container">
          <View style={styles.bubbleStyle}>
            <Avatar
              plan={plan}
              avatar={avatar}
              onPress={handleProfile}
              size={'medium'}
              testID="avatar-bubble-left"
              isAccept
            />
            <View style={styles.headerName}>
              <Text
                h={'h4'}
                textStyle={styles.lightText}
                title={title || ' '}
                testID="comment-bubble-left-comment"
              />
              <Space height={vs(5)} />
              <Text
                title={fullName}
                h={'h4'}
                numberOfLines={1}
                textStyle={styles.nameStyle}
                testID="comment-bubble-left-fullName"
              />
              <View style={styles.headerName}>
                <Text
                  title={`${formatDate(createdAt)}`}
                  h={'h5'}
                  textStyle={styles.dateStyle}
                  testID="comment-bubble-left-date"
                />
              </View>
            </View>
          </View>
          <Space height={vs(2)} />
        </Pressable>
      </View>
    </NeomorphFlexView>
  )
}

const styles = StyleSheet.create({
  bubbleStyle: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  container: {
    paddingBottom: s(10),
    paddingHorizontal: s(10),
    paddingTop: s(20),
  },
  dateStyle: {
    paddingLeft: 10,
  },
  headerName: {
    alignItems: 'flex-start',
    backgroundColor: transparent,
  },
  lightText: {
    maxWidth: W - 120,
    paddingLeft: 10,
    textAlign: 'left',
  },
  nameStyle: {
    fontWeight: 'bold',
    paddingLeft: 10,
  },
})

export { CommentBubbleLeft }
