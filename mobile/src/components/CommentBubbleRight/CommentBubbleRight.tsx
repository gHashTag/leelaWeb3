import React from 'react'

import { View, Pressable, StyleSheet } from 'react-native'

import { Avatar, NeomorphFlexView, Space, Text } from 'components'
import { W } from 'cons'
import { s, vs } from 'react-native-size-matters'
import { Post } from 'types'

interface CommentCardProps {
  post: Post
  onPress?: () => void
  fullName: string
  avatar: string
  date: string
  handleProfile: () => void
  isLeft?: boolean
}

const CommentBubbleRight: React.FC<CommentCardProps> = ({
  post,
  onPress,
  fullName,
  avatar,
  date,
  handleProfile,
}) => {
  return (
    <NeomorphFlexView>
      <View style={styles.container}>
        <Pressable onPress={onPress} testID="comment-bubble-right-container">
          <View style={styles.bubbleStyle}>
            <View style={styles.headerName}>
              <Text
                h={'h4'}
                textStyle={styles.lightText}
                title={post.text || ' '}
                testID="comment-bubble-right-comment"
              />
              <Space height={vs(5)} />
              <Text
                title={fullName}
                h={'h4'}
                numberOfLines={1}
                textStyle={styles.nameStyle}
                testID="comment-bubble-right-fullName"
              />
              <Space height={vs(2)} />
              <Text
                title={date}
                h={'h5'}
                textStyle={styles.dateStyle}
                testID="comment-bubble-right-date"
              />
            </View>
            <Avatar
              avatar={avatar}
              onPress={handleProfile}
              size={'medium'}
              plan={post.plan as number}
              isAccept={post.accept}
              additionalStyle={styles.img}
              testID="avatar-bubble-right"
            />
          </View>
          <Space height={vs(2)} />
          <View style={styles.headerName} />
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
    paddingRight: 10,
  },
  headerName: {
    alignItems: 'flex-end',
  },
  img: {
    top: 9,
  },
  lightText: {
    maxWidth: W - 120,
    paddingRight: 10,
    textAlign: 'right',
  },
  nameStyle: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
})

export { CommentBubbleRight }
