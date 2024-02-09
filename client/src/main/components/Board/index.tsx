import { type FC } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Column from 'main/components/Board/components/Column' 
import Card from 'main/components/Board/components/Card' 
import useBoard from 'main/components/Board/hook'

const Board: FC = () => {
  const {
    loading,
    error,
    columns,
    users,
    onDeleteCard,
    onDragEnd,
    setDraggedCard,
    onUserSelect,
    onAddCard,
    sortCardsInColumn
  } = useBoard()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <DragDropContext onDragStart={(start) => setDraggedCard(start.draggableId)} onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        {columns?.map((column) => (
          <Droppable droppableId={String(column.id)} key={column.id}>
            {(provided) => (
              <div 
                ref={provided.innerRef} 
                className="grid min-w-[240px] grid-rows-[40px_minmax(0,_1fr)_80px] rounded bg-gray-100 p-4"
                {...provided.droppableProps} 
              >
                <Column
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  counter={column.cards.length}
                  onAddCard={onAddCard}
                  sortCardsInColumn={sortCardsInColumn}
                >
                  {column.cards.map((card, index) => (
                    <Card
                      key={card.id}
                      id={card.id}
                      index={index}
                      text={card.text}
                      assignedUser={users.find(user => user.id === card.assignedUser) ?? null}
                      users={users}
                      onUserSelect={onUserSelect}
                      onDeleteCard={() => onDeleteCard(card.id)}
                    />
                  ))}
                  {provided.placeholder}
                </Column>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}

export default Board
