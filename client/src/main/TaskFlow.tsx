import { type FC } from 'react'

import Header from './components/Header' 
import Footer from './components/Footer' 
import Board from './components/Board'

const TaskFlow: FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex grow items-center justify-center p-4 md:p-8">
        <Board />
      </div>
      <Footer />
    </div>
  )
}

export default TaskFlow
