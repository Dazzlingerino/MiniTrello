import { type FC, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { type User } from 'main/types'
import { AVATAR_COLORS, DEFAULT_AVATAR_COLOR } from 'main/constants'
import generateColorForString from 'main/utils/generateColorForString'
import IconSVG from 'main/components/inlineImages'

import UsersList from './UsersList'

export interface CardProps {
  id: string
  index: number
  text: string
  assignedUser: User | null
  users: User[]
  onUserSelect: (cardId: string, user: User) => Promise<void>
  onDeleteCard: () => Promise<void>
}

const Card: FC<CardProps> = ({
  id,
  index,
  text,
  assignedUser,
  users,
  onUserSelect: _onUserSelect,
  onDeleteCard
}) => {
  const [showUsersList, setShowUsersList] = useState(false)
  const [showOptionsMenu, setShowOptionsMenu] = useState(false)

  const onUserSelect = (user: User) => {
    void _onUserSelect(id, user)
    setShowUsersList(!showUsersList)
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2 flex flex-col rounded bg-white p-2 shadow"
        >
          <div className="grid items-center justify-between">
            <p>{text}</p>

            <div className="relative col-start-2 row-start-1 justify-self-center">
              <button 
                className="outline-none focus:outline-none"
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              >
                <IconSVG.ThreeDots />
              </button>

              {showOptionsMenu && (
                <div className="absolute z-10 mt-2 w-24 rounded border bg-white shadow">
                  <ul className="text-sm">
                    <li 
                      className="cursor-pointer p-2 text-red-500 hover:bg-gray-100" 
                      onClick={() => void onDeleteCard()}
                    >
                        Delete
                    </li>
                    {/* Additional options here */}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative col-start-2 row-start-2 justify-self-center">
              <button 
                className="outline-none focus:outline-none"
                onClick={() => setShowUsersList(!showUsersList)} 
              >
                <IconSVG.Person color={generateColorForString(assignedUser?.name ?? '', AVATAR_COLORS, DEFAULT_AVATAR_COLOR)} />
              </button>

              {showUsersList && (
                <UsersList users={users} onUserSelect={onUserSelect}/>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Card
