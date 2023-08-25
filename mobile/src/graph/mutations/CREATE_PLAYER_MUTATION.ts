import { gql } from '@apollo/client'

export const CREATE_PLAYER_MUTATION = gql`
  mutation CreatePlayer($input: PlayerInput!) {
    createPlayer(input: $input) {
      id
      rallyAccount
      fullName
      avatar
      intention
      email
      plan
      previousPlan
      isStart
      isFinished
      consecutiveSixes
      positionBeforeThreeSixes
      reports {
        id
        title
        createdAt
        likes {
          id
          createdAt
        }
        comments {
          id
          createdAt
        }
      }
      createdAt
    }
  }
`
