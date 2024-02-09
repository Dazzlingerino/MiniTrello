const { findColumnById, getColumns, addCardToColumn } = require('../../state/boardState');

const addCard = (_, { columnId, text }) => {
  const columns = getColumns();

  const newCardId = String(Math.max(0, ...columns.flatMap(column => column.cards.map(card => Number(card.id)))) + 1);
  const customOrder = Math.floor(Math.random() * 101);
  const newCard = {
    id: newCardId, 
    text, 
    assignedUser: null, 
    creationDate: new Date().toISOString(),
    customOrder
  };

  addCardToColumn(columnId, newCard);

  return findColumnById(columnId);
};

module.exports = addCard;
