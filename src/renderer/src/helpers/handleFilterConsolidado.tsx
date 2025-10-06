import { State } from '@renderer/store'
import { confirmAlert } from 'react-confirm-alert'
import { FiPackage, FiX } from 'react-icons/fi'
import { MdAttachMoney } from 'react-icons/md'

interface Params {
  setFilterBy: (filter: State['filterBy']) => void
  toggleModal: (id: 'pdfModal' | 'consolidadoModal') => void
}

export const handleFilterConsolidado = ({ setFilterBy, toggleModal }: Params) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="confirm-alert-wrapper">
          <h2>Generar consolidado</h2>
          <p>Selecciona el nombre del departamento para generar su respectivo consolidado</p>
          <div className="flex items-center gap-x-4">
            <button
              className="btn-confirm !bg-green-700 hover:!bg-green-700/90"
              onClick={() => {
                setFilterBy('PAQUETES')
                onClose()
                toggleModal('consolidadoModal')
              }}
            >
              <FiPackage size={20} className="mr-2" />
              Paquetes
            </button>
            <button
              className="btn-confirm !bg-blue-600 hover:!bg-blue-600/90"
              onClick={() => {
                setFilterBy('FINANCIERO')
                onClose()
                toggleModal('consolidadoModal')
              }}
            >
              <MdAttachMoney size={20} className="mr-2" />
              Financiero
            </button>
            <button className="btn-confirm" onClick={onClose}>
              <FiX size={20} className="mr-2" />
              Cancelar
            </button>
          </div>
        </div>
      )
    }
  })
}
