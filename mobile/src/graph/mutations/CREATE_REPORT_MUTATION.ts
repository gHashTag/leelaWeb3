import { gql } from '@apollo/client'

export const CREATE_REPORT_MUTATION = gql`
  mutation CREATE_REPORT_MUTATION($input: ReportInput!) {
    createReport(input: $input) {
      rallyAccount
      createdAt
      id
      plan
      title
    }
  }
`
