const { getColumns, updateColumns } = require('../../state/boardState');

const deleteCard = (_, { cardId }) => {
  const columnsFromState = getColumns();

  const columns = columnsFromState.map(column => ({
    ...column,
    cards: column.cards.filter(card => card.id !== cardId),
  }));

  updateColumns(columns);
  return cardId;
};

module.exports = deleteCard;
