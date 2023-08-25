import { gql } from '@apollo/client'

export const GET_ALL_REPORTS_QUERY = gql`
  query GetAllReportsQuery {
    getAllReports {
      id
      plan
      player {
        avatar
        fullName
      }
      title
      createdAt
      likes {
        id
        player {
          id
          fullName
        }
      }
      comments {
        createdAt
        id
        title
        author {
          avatar
          fullName
          plan
        }
      }
    }
  }
`
