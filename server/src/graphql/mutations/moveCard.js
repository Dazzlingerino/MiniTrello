const { getColumns, updateColumns } = require('../../state/boardState');

const moveCard = (_, { cardId, newColumnId }) => {
  let movedCard;
  const columnsFromState = getColumns();

  const columns = columnsFromState.map(column => {
    const filteredCards = column.cards.filter(card => {
      if (card.id === cardId) {
        movedCard = { ...card };
        return false;
      }
      return true;
    });
    return { ...column, cards: filteredCards };
  });

  if (!movedCard) throw new Error(`Card with ID ${cardId} not found`);

  const updatedColumns = columns.map(column => {
    if (column.id === newColumnId) {
      column.cards.push(movedCard);
    }
    return column;
  });

  updateColumns(updatedColumns);
  return movedCard;
};

module.exports = moveCard;
