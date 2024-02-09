const { gql } = require('apollo-server-express');
const cardType = require('./types/card');
const columnType = require('./types/column');
const userType = require('./types/user');

const rootSchema = gql`
  ${cardType}
  ${columnType}
  ${userType}
  
  type Query {
    getColumns: [Column]!
    getUsers: [User]!
  }

  type Mutation {
    addCard(columnId: ID!, text: String!): Column!
    moveCard(cardId: ID!, newColumnId: ID!): Card!
    deleteCard(cardId: ID!): ID!
    changeUser(cardId: ID!, assignedUser: ID!): Card!
  }
`;

module.exports = rootSchema;
