import { Filter } from '@renderer/interfaces'
import { useAgendaStore, useModals } from '@renderer/store'
import clsx from 'clsx'
import { FiArrowLeft, FiFile, FiPackage, FiPlus } from 'react-icons/fi'
import { MdAttachMoney } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export const AgendaSidebar = () => {
  const { filterBy, setFilterBy } = useAgendaStore()
  const toggleModal = useModals((state) => state.toggleModal)
  const navigate = useNavigate()

  const handleFilter = (filter: Filter) => {
    setFilterBy(filter)
  }

  return (
    <div className="h-screen pt-14 border-r border-gray-200">
      <h2 className="mb-5 px-5 text-3xl font-semibold text-secondary">Agenda</h2>

      <button
        className="agenda-btn-sidebar"
        onClick={() => navigate('/app/home', { replace: true })}
      >
        <FiArrowLeft size={20} />
        Regresar
      </button>

      <button className="agenda-btn-sidebar" onClick={() => toggleModal('newBookingModal')}>
        <FiPlus size={20} />
        Crear nuevo registro
      </button>

      <button
        className={clsx('agenda-btn-sidebar', {
          '!border-secondary': filterBy === 'PAQUETES'
        })}
        onClick={() => handleFilter('PAQUETES')}
      >
        <FiPackage size={20} />
        Paquetes
      </button>

      <button
        className={clsx('agenda-btn-sidebar', {
          '!border-secondary': filterBy === 'FINANCIERO'
        })}
        onClick={() => handleFilter('FINANCIERO')}
      >
        <MdAttachMoney size={20} />
        Financiero
      </button>

      <button className="agenda-btn-sidebar">
        <FiFile size={20} />
        Consolidado
      </button>
    </div>
  )
}
