const { gql } = require('apollo-server-express');

const columnType = gql`
  type Column {
    id: ID!
    title: String!
    cards: [Card]!
  }
`;

module.exports = columnType;
