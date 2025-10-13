import { confirmAlert } from 'react-confirm-alert'
import { FiLogOut, FiSave } from 'react-icons/fi'

export const handleSaveAndExit = (): Promise<boolean> => {
  return new Promise((resolve) => {
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
                  resolve(true)
                  onClose()
                }}
              >
                <FiSave size={20} className="mr-2" />
                Si, guardar
              </button>
              <button
                className="btn-confirm"
                onClick={() => {
                  resolve(false)
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
  })
}
