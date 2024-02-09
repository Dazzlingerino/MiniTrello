export interface Column {
  id: string
  title: string
  cards: Card[]
}

export interface Card {
  id: string
  text: string
  assignedUser?: string | null
  creationDate: string
  customOrder: number
}

export interface BoardData {
  getColumns: Column[]
  getUsers: User[]
}

export interface User {
  id: string
  name: string
}
