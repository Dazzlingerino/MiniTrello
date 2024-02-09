let users = [
  { id: '1', name: 'User 1' },
  { id: '2', name: 'User 2' },
  { id: '3', name: 'User 3'}
];

let columns = [
  { 
    id: '1',
    title: 'To Do',
    cards: [
      { id: '1', text: 'Task 1', assignedUser: users[0].id, creationDate: new Date('2024.01.01').toISOString(), customOrder: 5 },
      { id: '2', text: 'Task 2', assignedUser: null, creationDate: new Date().toISOString(), customOrder: 2 }
    ]
  },
  { 
    id: '2', 
    title: 'In Progress', 
    cards: [
      { id: '3', text: 'Task 3', assignedUser: users[1].id, creationDate: new Date('2023.07.12').toISOString(), customOrder: 3 }
    ]
  },
  { 
    id: '3', 
    title: 'Done', 
    cards: [
      { id: '4', text: 'Task 4', assignedUser: null, creationDate: new Date('2022.05.12').toISOString(), customOrder: 4 }
    ] 
  }
];


const getColumns = () => columns;
const getUsers = () => users;

const updateColumns = (newColumns) => {
  columns = newColumns;
};

const findColumnById = (columnId) => columns.find(column => column.id === columnId);

const addCardToColumn = (columnId, newCard) => {
  columns = columns.map(column =>
    column.id === columnId
      ? { ...column, cards: column.cards.concat(newCard) }
      : column
  );
};

module.exports = { 
  getColumns, 
  getUsers,
  updateColumns,
  findColumnById, 
  addCardToColumn
}