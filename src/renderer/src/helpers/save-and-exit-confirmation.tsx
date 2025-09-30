import { confirmAlert } from 'react-confirm-alert'
import { FiLogOut, FiSave } from 'react-icons/fi'
import type { NavigateFunction } from 'react-router-dom'
import type { ObservationPageFormValues } from '@renderer/interfaces'

interface Props {
  form: ObservationPageFormValues
  navigate: NavigateFunction
  onSave: () => void
}

export const handleSaveAndExit = () => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="p-20 rounded bg-white border border-gray-200 shadow-md">
          <h2 className="font-semibold text-3xl text-secondary">Confirmación</h2>
          <p className="text-gray-600 mb-5">¿Quieres guardar los cambios?</p>
          <div className="flex items-center">
            <button
              className="btn-confirm !bg-blue-600 hover:!bg-blue-600/90 mr-5"
              onClick={onClose}
            >
              <FiSave size={20} className="mr-2" />
              Si, guardar
            </button>
            <button className="btn-confirm" onClick={onClose}>
              <FiLogOut size={20} className="mr-2" />
              No, salir sin guardar
            </button>
          </div>
        </div>
      )
    }
  })
}
