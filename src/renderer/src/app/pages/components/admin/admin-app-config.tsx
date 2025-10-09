import { FiChevronDown, FiPackage, FiSettings } from 'react-icons/fi'
import { MdAttachMoney } from 'react-icons/md'
import { Tooltip } from 'react-tooltip'

export const AdminAppConfigPanel = () => {
  return (
    <>
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
        <div className="flex flex-col gap-y-12">
          <div className="config-option">
            <div className="flex items-center text-[20px] gap-x-3">
              <span className="p-3 rounded border border-gray-200 text-secondary bg-gray-300/40">
                <FiPackage size={18} />
              </span>
              Paquetes
            </div>
            <button
              className="py-2 px-5 rounded bg-gray-300/40 border border-gray-200 duration-150 hover:border-gray-300 cursor-pointer"
              data-tooltip-id="config-option"
            >
              Seleccionar limite
              <FiChevronDown size={20} className="inline-block ml-3" />
            </button>
          </div>

          <div className="config-option">
            <div className="flex items-center text-[20px] gap-x-3">
              <span className="p-3 rounded border border-gray-200 text-secondary bg-gray-300/40">
                <MdAttachMoney size={18} />
              </span>
              Financiero
            </div>
            <button
              className="py-2 px-5 rounded bg-gray-300/40 border border-gray-200 duration-150 hover:border-gray-300 cursor-pointer"
              data-tooltip-id="config-option"
            >
              Seleccionar limite
              <FiChevronDown size={20} className="inline-block ml-3" />
            </button>
          </div>
        </div>
      </div>

      <Tooltip
        openOnClick
        clickable
        opacity={1}
        closeEvents={{ click: true }}
        id="config-option"
        place="bottom"
        border="1px solid #d1d5dc"
        className="!p-3 !border !border-gray-300 !rounded-lg !shadow-lg !bg-white !z-40"
      >
        <div className="flex flex-col justify-center items-center gap-y-3">
          <button className="user-option-btn">Sin limite</button>
          <button className="user-option-btn">4</button>
          <button className="user-option-btn">3</button>
          <button className="user-option-btn">2</button>
          <button className="user-option-btn">1</button>
        </div>
      </Tooltip>
    </>
  )
}
