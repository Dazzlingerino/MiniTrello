const { getColumns, updateColumns } = require('../../state/boardState');

const deleteCard = (_, { cardId }) => {
  const columns = getColumns().map(column => ({
    ...column,
    cards: column.cards.filter(card => card.id !== cardId),
  }));

  updateColumns(columns);
  return cardId;
};

module.exports = deleteCard;
