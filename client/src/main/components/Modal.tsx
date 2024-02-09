import { type FC, type ReactNode, type FormEvent  } from 'react'
import ReactDOM from 'react-dom'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  submitBtnTitle?: string
  cancelBtnTitle?: string
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ 
  isOpen,
  onClose,
  onSubmit,
  submitBtnTitle = 'Submit',
  cancelBtnTitle = 'Cancel',
  children
}) => {
  if (!isOpen) return null

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit() 
  }

  return ReactDOM.createPortal(
    <div className="fixed left-0 top-0 flex size-full items-center justify-center bg-black/50 backdrop-blur">
      <div className="rounded bg-white p-8 shadow-md">
        <form 
          className="grid grid-rows-2 items-center gap-4"
          onSubmit={handleSubmit} 
        >
          {children}
  
          <div className="col-span-full row-start-2 flex justify-between">
            <button 
              type="submit"
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              {submitBtnTitle}
            </button>
            <button 
              onClick={onClose}
              type="button"
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              {cancelBtnTitle}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  )
}

export default Modal
