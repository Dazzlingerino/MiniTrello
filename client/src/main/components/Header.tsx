import { type FC } from 'react'

const Header: FC = () => {
  return (
    <header className="bg-blue-500 p-4 text-lg font-semibold text-white">
      <ul className="flex items-center justify-between">
        <li>Task Flow Board</li>
        <li>More Options</li>
      </ul>
    </header>
  )
}

export default Header
