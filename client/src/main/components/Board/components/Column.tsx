import { type FC, type ReactNode, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'

import Modal from 'main/components/Modal'

export interface ColumnProps {
  id: string
  title: string
  children: ReactNode
  counter: number
  onAddCard: (columnId: string, text: string) => Promise<void>
  sortCardsInColumn: (columnId: string, sortOrder: string) => void
}

const Column: FC<ColumnProps> = ({ 
  id,
  title,
  counter,
  children,
  onAddCard,
  sortCardsInColumn 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCardText, setNewCardText] = useState('')

  const handleAddCard = () => {
    if (newCardText.trim()) {
      void onAddCard(id, newCardText)
      setIsModalOpen(false)
      setNewCardText('')
    }
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = event.target.value
    sortCardsInColumn(id, sortOrder)
  }

  return (
    <>
      <div className='mb-4 grid grid-cols-[auto_minmax(0,_14px)_1fr] gap-2'>
        <h2 className="max-h-6 min-w-max text-lg font-bold">{title}</h2>
        <h3 className=" max-h-6 text-lg">{counter}</h3>
        <select 
          className="max-h-8 max-w-min place-self-end rounded border px-2 py-1"
          onChange={handleSortChange} 
        >
          <option value="creationDate">Sort by Creation Date</option>
          <option value="customOrder">Custom Sort</option>
        </select>
      </div>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button 
        onClick={() => setIsModalOpen(true)} 
        className="mb-2 self-end rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Add Card
      </button>

      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddCard}
          submitBtnTitle='Add Card'
        >
          <input
            type="text"
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
            placeholder="Enter card name..."
            className="w-full rounded border border-gray-200 p-2"
          />
        </Modal>
      )}
    </>
  )
}

export default Column
