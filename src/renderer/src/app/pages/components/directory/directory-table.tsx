import { formatDate } from '@renderer/helpers'
import { SchoolDirectoryEntry } from '@renderer/interfaces'
import { FaSort } from 'react-icons/fa'
import { FiMoreVertical, FiPlus, FiSearch } from 'react-icons/fi'
import { Pagination } from '../../../../components/pagination'

const schools: SchoolDirectoryEntry[] = [
  {
    id: '1',
    infra: '11669',
    name: 'Centro Escolar General Ramon Belloso',
    municipio: 'San Salvador',
    nit: '0614-200917-106-2',
    sector: 'PÚBLICO',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    infra: '10057',
    name: 'Instituto Nacional Jaime Francisco Lopez',
    municipio: 'San Salvador',
    nit: '0614-200917-106-2',
    sector: 'PÚBLICO',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    infra: '88061',
    name: 'Centro Escolar Catolico Emiliani',
    municipio: 'San Salvador',
    nit: '064088662',
    sector: 'PRIVADO',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const DirectoryTable = () => {
  return (
    <div>
      <nav className="mb-5 flex items-center justify-between">
        <div className="relative w-[30%]">
          <FiSearch size={20} className="absolute top-1/2 -translate-y-1/2 left-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por infraestructura o nombre"
            className="w-full flex items-center gap-x-3 py-3 px-5 ps-12 shadow-md rounded border border-gray-300 text-secondary/90 duration-150 outline-none hover:text-secondary hover:border-gray-400 focus:border-gray-400"
          />
        </div>

        <button className="flex items-center gap-x-3 py-3 px-5 shadow-md rounded border border-gray-300 text-secondary/90 duration-150 hover:text-secondary hover:border-gray-400 cursor-pointer">
          <FiPlus size={20} />
          Nuevo
        </button>
      </nav>

      {/* TABLE */}
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
          {/* head */}
          <thead className="text-xs text-gray-500 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 w-[10%]">
                <div className="flex items-center">
                  Cód. Infra
                  <FaSort size={12} className="ml-2" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Centro Escolar
                  <FaSort size={12} className="ml-2" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Municipio
                  <FaSort size={12} className="ml-2" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Sector
                  <FaSort size={12} className="ml-2" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Últ. modificación
                  <FaSort size={12} className="ml-2" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {schools.map((item) => (
              <tr
                key={item.id}
                className="bg-white text-secondary border-b border-gray-300 text-base"
              >
                <td className="px-6 py-4 w-[10%]">{item.infra}</td>
                <td className="px-6 py-4 font-semibold text-secondary whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-6 py-4">{item.municipio}</td>
                <td className="px-6 py-4">{item.sector}</td>
                <td className="px-6 py-4">{formatDate(item.updatedAt)}</td>
                <td className="px-6 py-4">
                  <button>
                    <FiMoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-5 uppercase border border-t-0 border-gray-200 font-medium text-gray-500">
          <Pagination
            currentPage={1}
            totalPages={1}
            triggerCurrentPage={() => {}}
            btnClassName="p-2 rounded shadow border border-gray-300 cursor-pointer duration-150 hover:border-gray-400 hover:text-secondary disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  )
}
