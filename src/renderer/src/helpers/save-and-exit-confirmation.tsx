import { confirmAlert } from 'react-confirm-alert'
import { FiLogOut, FiSave } from 'react-icons/fi'
import type { NavigateFunction } from 'react-router-dom'
import type { ObservationPageFormValues } from '@renderer/interfaces'
import { onSave } from '@renderer/app/actions/observation/onSave'
import { toast } from 'react-toastify'

interface Params {
  form: ObservationPageFormValues
  username: string
  action: 'create' | 'update'
  reset: () => void
  navigate: NavigateFunction
}

export const handleSaveAndExit = ({ form, action, username, reset, navigate }: Params) => {
  const handleSave = async () => {
    if (!username) return
    const { ok, message } = await onSave({ data: { ...form }, username, action })
    if (!ok) {
      toast.error(message ?? 'Error al ejecutar la acción')
      return
    }

    reset()
    toast.success(message ?? 'Acción completada correctamente')
    navigate('/app/home', { replace: true })
  }

  const handleExit = async () => {
    reset()
    navigate('/app/home', { replace: true })
  }

  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="confirm-alert-wrapper">
          <h2>Confirmación</h2>
          <p>¿Quieres guardar los cambios?</p>
          <div className="flex items-center">
            <button
              className="btn-confirm !bg-blue-600 hover:!bg-blue-600/90 mr-5"
              onClick={() => {
                handleSave()
                onClose()
              }}
            >
              <FiSave size={20} className="mr-2" />
              Si, guardar
            </button>
            <button
              className="btn-confirm"
              onClick={() => {
                handleExit()
                onClose()
              }}
            >
              <FiLogOut size={20} className="mr-2" />
              No, salir sin guardar
            </button>
          </div>
        </div>
      )
    }
  })
}
