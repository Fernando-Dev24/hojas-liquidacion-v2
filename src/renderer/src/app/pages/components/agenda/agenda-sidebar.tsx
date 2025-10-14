import { FiArrowLeft, FiFile, FiPackage } from 'react-icons/fi'
import { MdAttachMoney } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export const AgendaSidebar = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen border-r border-gray-200">
      <button
        className="agenda-btn-sidebar"
        onClick={() => navigate('/app/home', { replace: true })}
      >
        <FiArrowLeft size={20} />
        Regresar
      </button>

      <button className="agenda-btn-sidebar">
        <FiPackage size={20} />
        Paquetes
      </button>

      <button className="agenda-btn-sidebar">
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
