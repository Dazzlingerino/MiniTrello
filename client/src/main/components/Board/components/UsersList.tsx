import { useState, type FC, type ChangeEvent } from 'react'
import { debounce } from 'lodash'

import { type User } from 'main/types'
import { AVATAR_COLORS, DEFAULT_AVATAR_COLOR } from 'main/constants'
import generateColorForString from 'main/utils/generateColorForString'
import IconSVG from 'main/components/inlineImages'

export interface UsersListProps {
  users: User[]
  onUserSelect: (user: User) => void
}

const UsersList: FC<UsersListProps> = ({ users, onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const debouncedSetSearchTerm = debounce((value) => {
    setSearchTerm(value)
  }, 300)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchTerm(event.target.value)
  }

  return (
    <div className="relative">
      <div className="absolute right-0 z-10 w-48 rounded-md border bg-white shadow-lg">
        <div className="border-b p-2">
          <input
            type="text"
            placeholder="Search user..."
            onChange={handleChange}
            className="w-full rounded-md border px-2 py-1 text-sm focus:outline-none"
          />
        </div>
  
        <ul className="max-h-60 overflow-y-auto">
          {filteredUsers.map(user => (
            <li
              key={user.id}
              className="flex cursor-pointer items-center px-2 py-1 hover:bg-gray-100"
              onClick={() => onUserSelect(user)}
            >
              <IconSVG.Person color={generateColorForString(user.name, AVATAR_COLORS, DEFAULT_AVATAR_COLOR)} />
              <span className="ml-2 text-sm">{user.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UsersList
