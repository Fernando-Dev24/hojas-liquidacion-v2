import { confirmAlert } from 'react-confirm-alert'
import { FiTrash, FiX } from 'react-icons/fi'
import type { NavigateFunction } from 'react-router-dom'

interface Props {
  id: string
  deleteItem: (id: string) => void
  navigate?: NavigateFunction
  path?: string
}

export const handleConfirmDelete = ({ id, deleteItem, navigate, path }: Props) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="confirm-alert-wrapper">
          <h2 className="font-semibold text-3xl text-secondary">Confirmación</h2>
          <p className="text-gray-600 mb-5">¿Quieres eliminar este elemento?</p>
          <div className="flex items-center gap-x-5">
            <button
              className="btn-confirm !bg-red-600 hover:!bg-red-600/80"
              onClick={() => {
                deleteItem(id)
                onClose()
                if (navigate && path) navigate(path, { replace: true })
              }}
            >
              <FiTrash size={20} className="mr-2" />
              Si, eliminar
            </button>
            <button
              className="btn-confirm"
              onClick={() => {
                onClose()
              }}
            >
              <FiX size={20} className="mr-2" />
              No, cancelar
            </button>
          </div>
        </div>
      )
    }
  })
}
