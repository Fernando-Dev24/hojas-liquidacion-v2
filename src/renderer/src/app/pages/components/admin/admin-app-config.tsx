import { FiPackage, FiSettings } from 'react-icons/fi'
import { MdAttachMoney } from 'react-icons/md'

export const AdminAppConfigPanel = () => {
  return (
    <div className="admin-panel-wrapper">
      {/* HEADER */}
      <div className="flex items-center gap-x-8 mb-14">
        <span className="p-3 rounded border border-gray-200 text-secondary bg-gray-300/40">
          <FiSettings size={20} />
        </span>
        <div>
          <h2 className="text-3xl font-medium">Configuración</h2>
          <p className="text-gray-600">
            Edita los limites para agendar segun la categoria, entre otras cosas
          </p>
        </div>
      </div>

      {/* SETTINGS */}
      <div className="flex flex-col gap-y-10">
        <div className="config-option">
          <div>
            <p className="text-[20px]">
              <FiPackage size={18} className="mb-1 text-secondary" />
              Paquetes
            </p>
          </div>
          <select className="!w-[20%] !py-1 !px-3">
            <option value="Sin limite">Sin limite</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>

        <div className="config-option">
          <div>
            <p className="text-[20px]">
              <MdAttachMoney size={18} className="mb-1 text-secondary" />
              Financiero
            </p>
          </div>
          <select className="!w-[20%] !py-1 !px-3">
            <option value="Sin limite">Sin limite</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>
      </div>
    </div>
  )
}
