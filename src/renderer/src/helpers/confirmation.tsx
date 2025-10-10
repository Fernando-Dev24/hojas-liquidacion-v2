import { confirmAlert } from 'react-confirm-alert'
import { FiTrash, FiX } from 'react-icons/fi'

export const handleConfirmDelete = (): Promise<boolean> => {
  return new Promise((resolve) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="confirm-alert-wrapper">
          <h1 className="font-semibold text-3xl text-secondary">Confirmación</h1>
          <p className="text-gray-600 mb-5">¿Quieres eliminar este elemento?</p>
          <div className="flex items-center gap-x-5">
            <button
              className="btn-confirm !bg-red-600 hover:!bg-red-600/80"
              onClick={async () => {
                resolve(true)
                onClose()
              }}
            >
              <FiTrash size={20} className="mr-2" />
              Si, eliminar
            </button>
            <button
              className="btn-confirm"
              onClick={() => {
                resolve(false)
                onClose()
              }}
            >
              <FiX size={20} className="mr-2" />
              No, cancelar
            </button>
          </div>
        </div>
      )
    })
  })
}
