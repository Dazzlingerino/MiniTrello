import { gql } from '@apollo/client'

export const GET_COLUMNS = gql`
  query {
    getColumns {
      id
      title
      cards {
        id
        text
        assignedUser
        creationDate
        customOrder
      }
    }
    getUsers {
      id
      name
    }
  }
`

export const ADD_CARD = gql`
  mutation AddCard($columnId: ID!, $text: String!) {
    addCard(columnId: $columnId, text: $text) {
      id
      title
      cards {
        id,
        text
        assignedUser
        creationDate
        customOrder
      }
    }
  }
`

export const MOVE_CARD = gql`
  mutation MoveCard($cardId: ID!, $newColumnId: ID!) {
    moveCard(cardId: $cardId, newColumnId: $newColumnId) {
      id
    }
  }
`

export const DELETE_CARD = gql`
  mutation DeleteCard($cardId: ID!) {
    deleteCard(cardId: $cardId)
  }
`

export const CHANGE_USER = gql`
  mutation ChangeUser($cardId: ID!, $assignedUser: ID!) {
    changeUser(cardId: $cardId, assignedUser: $assignedUser) {
      id
      text
      assignedUser
    }
  }
`