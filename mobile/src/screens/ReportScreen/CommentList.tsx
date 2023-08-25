import React from 'react'

import { FlatList, StyleSheet } from 'react-native'

import { CommentBubbleLeft, Space } from 'components'
import { vs } from 'react-native-size-matters'
import { Comment } from 'types' // Импортируйте тип Comment

interface CommentListProps {
  comments: Comment[]
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const renderItem = ({ item }: { item: Comment }) => {
    return (
      <>
        <Space height={vs(10)} />
        <CommentBubbleLeft
          item={item}
          handleProfile={() => console.log('click')}
        />
      </>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={comments}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'gold',
    justifyContent: 'center',
    paddingHorizontal: 20,
    top: 30,
  },
})

export default CommentList
