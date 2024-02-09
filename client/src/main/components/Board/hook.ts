import { useEffect, useState } from 'react'
import { type DropResult } from 'react-beautiful-dnd'
import { useMutation, useQuery } from '@apollo/client'

import { GET_COLUMNS, ADD_CARD, MOVE_CARD, DELETE_CARD, CHANGE_USER } from 'graphql/queries'

import { type User, type BoardData, type Column } from 'main/types'

export interface UseBoardReturn {
  loading: boolean
  error: Error | undefined
  columns: Column[] | undefined
  draggedCard: string | null
  users: User[]
  setDraggedCard: (cardId: string | null) => void
  onAddCard: (columnId: string, text: string) => Promise<void>
  onDragEnd: (result: any) =>  Promise<void>
  onDeleteCard: (cardId: string) => Promise<void>
  onUserSelect: (cardId: string, user: User) => Promise<void>
  sortCardsInColumn: (columnId: string, sortOrder: string) => void
}

const useBoard = (): UseBoardReturn => {
  const { loading, error, data } = useQuery<BoardData>(GET_COLUMNS)
  const [columns, setColumns] = useState<Column[]>([])
  const [addCardMutation] = useMutation(ADD_CARD)
  const [moveCardMutation] = useMutation(MOVE_CARD)
  const [deleteCardMutation] = useMutation(DELETE_CARD)
  const [changeUserMutation] = useMutation(CHANGE_USER)
  const [draggedCard, setDraggedCard] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>([])

  const sortCardsInColumn = (columnId: string, sortOrder: string) => {
    const sortedColumns = columns.map(column => {
      if (column.id === columnId) {
        const sortedCards = [...column.cards]
        if (sortOrder === 'creationDate') {
          sortedCards.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime())
        } else if (sortOrder === 'customOrder') {
          sortedCards.sort((a, b) => a.customOrder - b.customOrder)
        }
        return { ...column, cards: sortedCards }
      }
      return column
    })
  
    setColumns(sortedColumns)
  }
  
  const onAddCard = async (columnId: string, text: string) => {
    if (!text.trim()) return

    await addCardMutation({
      variables: { columnId, text },
      update: (cache, { data: { addCard } }) => {
        const existingData = cache.readQuery<{ getColumns: Column[] }>({ query: GET_COLUMNS })
        if (!existingData) return

        const newColumns = existingData.getColumns.map(column => {
          if (column.id === columnId) {
            return { ...column, cards: [...column.cards, addCard] }
          }
          return column
        })

        cache.writeQuery({
          query: GET_COLUMNS,
          data: { getColumns: newColumns }
        })
      }
    })
  }

  const onDeleteCard = async (cardId: string) => {
    await deleteCardMutation({
      variables: { cardId },
      update: (cache) => {
        const existingData = cache.readQuery<{ getColumns: Column[] }>({ query: GET_COLUMNS })
        if (!existingData) return
  
        const newColumns = existingData.getColumns.map(column => {
          const filteredCards = column.cards.filter(card => card.id !== cardId)
          return { ...column, cards: filteredCards }
        })
  
        cache.writeQuery({
          query: GET_COLUMNS,
          data: { getColumns: newColumns }
        })
      }
    })
  }

  const onDragEnd = async (result: DropResult) => {
    const { draggableId, source, destination } = result
  
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return // Do nothing if there's no destination or the card was dropped back to its original place
    }
  
    await moveCardMutation({
      variables: {
        cardId: draggableId,
        newColumnId: destination.droppableId
      },
      optimisticResponse: {
        moveCard: {
          __typename: 'Card',
          id: draggableId,
          columnId: destination.droppableId
        }
      },
      update: (cache) => {
        const existingData = cache.readQuery<{ getColumns: Column[] }>({ query: GET_COLUMNS })
        if (!existingData) return
  
        const newColumns = existingData.getColumns.map(column => ({ ...column, cards: [...column.cards] }))
  
        const sourceColumnIndex = newColumns.findIndex(column => column.id === source.droppableId)
        const cardIndex = newColumns[sourceColumnIndex].cards.findIndex(card => card.id === draggableId)
        const [movedCard] = newColumns[sourceColumnIndex].cards.splice(cardIndex, 1)
  
        const destinationColumnIndex = newColumns.findIndex(column => column.id === destination.droppableId)
        newColumns[destinationColumnIndex].cards.splice(destination.index, 0, movedCard)
  
        cache.writeQuery({
          query: GET_COLUMNS,
          data: { getColumns: newColumns }
        })
      }
    })
  }

  const onUserSelect = async (cardId: string, user: User) => {
    await changeUserMutation({
      variables: { cardId, assignedUser: user.id },
      update: (cache) => {
        const existingData = cache.readQuery<{ getColumns: Column[] }>({ query: GET_COLUMNS })
        if (!existingData) return

        const newColumns = existingData.getColumns.map(column => {
          const newCards = column.cards.map(card => {
            if (card.id === cardId) {
              // Update the card with the new assigned user
              return { ...card, assignedUser: user.id }
            }
            return card
          })
          return { ...column, cards: newCards }
        })

        cache.writeQuery({
          query: GET_COLUMNS,
          data: { getColumns: newColumns }
        })
      }
    }).catch(error => console.error('Failed to assign user to card:', error))
  }

  useEffect(() => {
    if (!loading && data) {
      setColumns(data.getColumns || [])
      setUsers(data.getUsers || [])
    }
  }, [loading, data])

  return {
    loading,
    error,
    columns,
    draggedCard,
    users,
    setDraggedCard,
    onAddCard,
    onDragEnd,
    onDeleteCard,
    onUserSelect,
    sortCardsInColumn
  }
}

export default useBoard
