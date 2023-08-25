import { gql } from '@apollo/client'

export const GET_PLAYER_BY_ID_QUERY = gql`
  query GetPlayerById($playerId: ID!) {
    getPlayer(id: $playerId) {
      id
      avatar
      rallyAccount
      email
      intention
      consecutiveSixes
      createdAt
      fullName
      isFinished
      isStart
      plan
      positionBeforeThreeSixes
      previousPlan
    }
  }
`
