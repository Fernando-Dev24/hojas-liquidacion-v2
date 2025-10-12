import { FiCheck, FiChevronDown, FiSettings } from 'react-icons/fi'
import { Tooltip } from 'react-tooltip'
import { configOptions } from '../../admin/types/config-type'

export const AdminAppConfigPanel = () => {
  return (
    <>
      <div className="relative admin-panel-wrapper">
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
          {configOptions.map((item) => (
            <div key={item.id}>
              <div className="config-option">
                <div className="flex items-center text-[20px] gap-x-3">
                  <span className="p-3 rounded border border-gray-200 text-secondary bg-gray-300/40">
                    {item.icon}
                  </span>
                  {item.label}
                </div>
                <button
                  className="py-2 px-5 rounded bg-gray-300/40 border border-gray-200 duration-150 hover:border-gray-300 cursor-pointer"
                  data-tooltip-id={`config-option-${item.id}`}
                >
                  Seleccionar limite
                  <FiChevronDown size={20} className="inline-block ml-3" />
                </button>
              </div>

              <Tooltip
                openOnClick
                clickable
                opacity={1}
                closeEvents={{ click: true }}
                id={`config-option-${item.id}`}
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
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="absolute bottom-12 right-12 flex items-center gap-x-5">
          <button className="btn-confirm !border !border-gray-300 !text-secondary !bg-transparent hover:!border-gray-400">
            Cancelar
          </button>
          <button className="btn-confirm">
            <FiCheck size={20} className="mr-3" />
            Aplicar
          </button>
        </div>
      </div>
    </>
  )
}
