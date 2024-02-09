const { getColumns, updateColumns, getUsers } = require('../../state/boardState');

const changeUser = (_, { cardId, assignedUserId }) => {
  let updatedCard;
  const columns = getColumns();

  columns.forEach(column => {
    column.cards.forEach(card => {
      if (card.id === cardId) {
        const user = getUsers().find(u => u.id === assignedUserId);
        card.assignedUser = user ? user.id : null;
        updatedCard = card;
      }
    });
  });

  if (!updatedCard) throw new Error(`Card with ID ${cardId} not found`);

  updateColumns(columns);
  return updatedCard;
};

module.exports = changeUser;
