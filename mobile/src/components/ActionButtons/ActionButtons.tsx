import React from 'react'

import { View, StyleSheet } from 'react-native'

import { ButtonVectorIcon, Space } from 'components'
import { fuchsia } from 'cons'
import { ms, s } from 'react-native-size-matters'

interface ActionButtonsProps {
  isAdmin: boolean
  commentCount: number
  likeCount: number
  isLiked: boolean
  handleAdminMenu: () => void
  handleComment: () => void
  handleLike: () => void
  handleShareLink: () => void
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isAdmin,
  commentCount,
  likeCount,
  handleAdminMenu,
  handleComment,
  handleLike,
  // handleShareLink,
  isLiked,
}) => {
  const iconSize = ms(15, 0.8)
  const heart = isLiked ? 'heart' : 'heart-outline'
  const heartColor = isLiked ? fuchsia : undefined
  return (
    <View style={styles.btnsContainer}>
      {isAdmin && (
        <>
          <ButtonVectorIcon
            onPress={handleAdminMenu}
            viewStyle={[styles.smallBtn, styles.nonDetailAdminMenuButton]}
            isIonicons
            name="ellipsis-vertical-circle"
            size={iconSize + 3}
            testID="admin-menu-button"
          />
          <Space height={12} />
        </>
      )}
      <ButtonVectorIcon
        onPress={handleComment}
        count={commentCount}
        viewStyle={[styles.smallBtn, styles.nonDetailCommentButton]}
        isIonicons
        name="chatbubble-outline"
        size={iconSize}
        testID="comment-button"
      />
      <ButtonVectorIcon
        count={likeCount}
        onPress={handleLike}
        color={heartColor}
        isIonicons
        iconSize={iconSize + 1.5}
        viewStyle={styles.smallBtn}
        name={heart}
        size={iconSize}
        testID={heart}
      />
      {/* <ButtonVectorIcon
        viewStyle={[styles.smallBtn, styles.nonDetailLinkButton]}
        name="link-outline"
        isIonicons
        iconSize={iconSize + 4}
        onPress={handleShareLink}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: s(8),
    top: 5,
  },
  nonDetailAdminMenuButton: {
    alignItems: 'flex-end',
    marginRight: s(4),
  },
  nonDetailCommentButton: {
    justifyContent: 'flex-start',
  },
  // nonDetailLinkButton: {
  //   justifyContent: 'flex-end',
  //   marginRight: s(5),
  // },
  smallBtn: {
    flexDirection: 'row',
  },
})

export { ActionButtons }
