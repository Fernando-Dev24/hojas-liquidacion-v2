import { Pagination } from '@renderer/components'
import { FiMoreVertical } from 'react-icons/fi'
import { LuSchool } from 'react-icons/lu'

export const AgendaPanel = () => {
  return (
    <section className="pt-14">
      <article className="relative mb-8 grid grid-cols-[10%_minmax(75%,_1fr)] gap-x-10 p-10 rounded-xl border border-gray-300 bg-gray-100 shadow">
        {/* FECHA Y HORA */}
        <div className="flex flex-col justify-start gap-y-5 ">
          <div className="text-right">
            <p className="text-gray-500 text-lg">Fecha</p>
            <p className="text-xl font-medium text-secondary">31 Oct</p>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-lg">Hora</p>
            <p className="text-xl font-medium text-secondary">10:00 AM</p>
          </div>
        </div>

        {/* CE, INFRA, DESC, TOTAL, RUBRO */}
        <div>
          <div>
            <span className="inline-flex items-center gap-x-3 text-sm text-gray-500">
              <LuSchool size={20} />
              88156
            </span>
            <p className="flex items-center gap-x-3 text-xl font-medium text-secondary">
              COMPLEJO EDUCATIVO CATOLICO RICARDO POMA
            </p>
            <p className="mb-5 text-sm text-gray-700">
              Salarios Media 2024 | $39,351.76 | Johan Guevara
            </p>
            <p className="w-[90%] text-sm text-gray-700">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse praesentium cum quasi
              possimus, quis autem? Et, voluptate. Dolorem, aliquid aliquam. Consequuntur autem
              adipisci, aliquid debitis sit hic eos eveniet molestias.
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <button className="absolute top-10 right-10 p-1 text-gray-600 duration-150 cursor-pointer hover:text-secondary">
          <FiMoreVertical size={20} />
        </button>
      </article>

      <article className="relative grid grid-cols-[10%_minmax(75%,_1fr)] gap-x-10 p-10 rounded-xl border border-gray-300 bg-gray-100 shadow">
        {/* FECHA Y HORA */}
        <div className="flex flex-col justify-start gap-y-5 ">
          <div className="text-right">
            <p className="text-gray-500 text-lg">Fecha</p>
            <p className="text-xl font-medium text-secondary">31 Oct</p>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-lg">Hora</p>
            <p className="text-xl font-medium text-secondary">10:00 AM</p>
          </div>
        </div>

        {/* CE, INFRA, DESC, TOTAL, RUBRO */}
        <div>
          <div>
            <span className="inline-flex items-center gap-x-3 text-sm text-gray-500">
              <LuSchool size={20} />
              88156
            </span>
            <p className="flex items-center gap-x-3 text-xl font-medium text-secondary">
              COMPLEJO EDUCATIVO CATOLICO RICARDO POMA
            </p>
            <p className="mb-5 text-sm text-gray-700">
              Salarios Media 2024 | $39,351.76 | Johan Guevara
            </p>
            <p className="w-[90%] text-sm text-gray-700">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse praesentium cum quasi
              possimus, quis autem? Et, voluptate. Dolorem, aliquid aliquam. Consequuntur autem
              adipisci, aliquid debitis sit hic eos eveniet molestias.
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <button className="absolute top-10 right-10 p-1 text-gray-600 duration-150 cursor-pointer hover:text-secondary">
          <FiMoreVertical size={20} />
        </button>
      </article>

      <div className="mt-10 text-white">
        <Pagination
          textColor="font-medium text-secondary"
          currentPage={1}
          totalPages={2}
          triggerCurrentPage={() => {}}
        />
      </div>
    </section>
  )
}
