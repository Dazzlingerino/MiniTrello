const { getColumns, updateColumns, getUsers } = require('../../state/boardState');

const changeUser = (_, { cardId, assignedUser }) => {
  let updatedCard;

  const columns = getColumns();
  const users = getUsers();

  columns.forEach(column => {
    column.cards.forEach(card => {
      if (card.id === cardId) {
        const user = users.find(u => u.id === assignedUser);
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
