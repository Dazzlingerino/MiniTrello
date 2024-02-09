const { gql } = require('apollo-server-express');

const userType = gql`
  type User {
    id: ID!
    name: String!
  }
`;

module.exports = userType;
