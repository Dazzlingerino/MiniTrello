const { getColumns, getUsers } = require('../state/boardState');
const addCard = require('./mutations/addCard');
const moveCard = require('./mutations/moveCard');
const deleteCard = require('./mutations/deleteCard');
const changeUser = require('./mutations/changeUser');

const resolvers = {
  Query: {
    getColumns,
    getUsers,
  },
  Mutation: {
    addCard,
    moveCard,
    deleteCard,
    changeUser
  },
};

module.exports = resolvers;