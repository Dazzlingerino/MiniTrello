const { gql } = require('apollo-server-express');

const cardType = gql`
  type Card {
    id: ID!
    text: String!
    assignedUser: ID
    creationDate: String!
    customOrder: Int!
  }
`;

module.exports = cardType;
