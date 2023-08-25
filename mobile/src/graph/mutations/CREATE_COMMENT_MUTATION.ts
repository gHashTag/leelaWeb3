import { gql } from '@apollo/client'

export const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($input: CommentInput!) {
    createComment(input: $input) {
      createdAt
      id
      title
    }
  }
`
