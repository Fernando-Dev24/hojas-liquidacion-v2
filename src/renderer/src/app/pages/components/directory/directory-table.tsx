import { FaSort } from 'react-icons/fa'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useModals } from '@renderer/store'
import { Pagination } from '../../../../components/pagination'
import { Empty } from '@renderer/components'
import { useDirectory } from '@renderer/store/directory'
import { getPaginatedDirectories, onSearchDirectory } from '@renderer/app/actions'
import { DirectoryTableItem } from './directory-table-item'

export const DirectoryTable = () => {
  const { toggleModal } = useModals()
  const {
    totalPages,
    searchResults,
    currentPage,
    setPagination,
    setSearchResults,
    triggerPagination
  } = useDirectory()
  const [searchQuery, setSearchQuery] = useState('')
  const {
    data: resp,
    isLoading,
    error
  } = useQuery({
    queryKey: ['directories', currentPage],
    queryFn: () =>
      getPaginatedDirectories({
        page: currentPage,
        take: 10
      })
  })

  /* FUNCTIONS */
  const onChangeSearchQuery = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    if (!value.trim()) {
      setSearchResults([])
      setSearchQuery(value)
      return
    }

    setSearchQuery(value)
  }

  const handleSearch = async () => {
    const toastId = toast.loading('Buscando...')
    const { ok, message, data } = await onSearchDirectory(searchQuery)
    if (!ok || !data) {
      setSearchResults([])
      return toast.update(toastId, {
        type: 'error',
        render: message,
        isLoading: false,
        autoClose: 2000,
        closeButton: true,
        closeOnClick: true
      })
    }

    setSearchResults(data)
    toast.dismiss(toastId)
  }

  useEffect(() => {
    if (resp) setPagination(resp.totalPages)
  }, [resp, isLoading])

  if (isLoading || !resp?.data) return <p>Cargando...</p>
  if (error) return <p>Error al obtener los directorios </p>

  if (resp.data.length < 1) return <Empty renderBtn fn={() => toggleModal('newDirectoryModal')} />
  return (
    <div>
      <nav className="mb-5 flex items-center justify-between">
        <div className="relative w-[30%]">
          <FiSearch size={20} className="absolute top-1/2 -translate-y-1/2 left-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por infraestructura"
            className="w-full flex items-center gap-x-3 py-3 px-5 ps-12 shadow-md rounded border border-gray-300 text-secondary/90 duration-150 outline-none hover:text-secondary hover:border-gray-400 focus:border-gray-400"
            value={searchQuery}
            onChange={(evt) => onChangeSearchQuery(evt)}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter') handleSearch()
            }}
          />
        </div>

        <button
          className="flex items-center gap-x-3 py-3 px-5 shadow-md rounded border border-gray-300 text-secondary/90 duration-150 hover:text-secondary hover:border-gray-400 cursor-pointer"
          onClick={() => toggleModal('newDirectoryModal')}
        >
          <FiPlus size={20} />
          Nuevo
        </button>
      </nav>

      {/* TABLE */}
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mb-14">
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
            {searchResults.length >= 1
              ? searchResults.map((item) => (
                  <DirectoryTableItem key={item.id} item={item} setSearchQuery={setSearchQuery} />
                ))
              : resp.data.map((item) => (
                  <DirectoryTableItem key={item.id} item={item} setSearchQuery={setSearchQuery} />
                ))}
          </tbody>
        </table>

        {searchResults.length < 1 && (
          <div className="px-6 py-5 uppercase border border-t-0 border-gray-200 font-medium text-gray-500">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              triggerCurrentPage={triggerPagination}
              btnClassName="p-2 rounded shadow border border-gray-300 cursor-pointer duration-150 hover:border-gray-400 hover:text-secondary disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            />
          </div>
        )}
      </div>
    </div>
  )
}
