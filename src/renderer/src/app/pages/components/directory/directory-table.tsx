import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useModals } from '@renderer/store'
import { Empty, Pagination, Error } from '@renderer/components'
import { useDirectory } from '@renderer/store/directory'
import { getPaginatedDirectories } from '@renderer/app/actions'
import { DirectoryTableItem } from './directory-table-item'
import { DirectoryTableSkeleton } from '..'
import { DirectorySearchbar } from './directory-searchbar'

export const DirectoryTable = () => {
  const { toggleModal } = useModals()
  const { totalPages, searchResults, currentPage, setPagination, triggerPagination } =
    useDirectory()
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

  useEffect(() => {
    if (resp) setPagination(resp.totalPages)
  }, [resp, isLoading])

  if (isLoading || !resp?.data) return <DirectoryTableSkeleton />
  if (error) return <Error errorLabel="los directorios" />

  if (resp.data.length < 1) return <Empty renderBtn fn={() => toggleModal('newDirectoryModal')} />
  return (
    <>
      <div>
        <DirectorySearchbar />

        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mb-14">
          <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
            <thead className="text-xs text-gray-500 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 w-[10%]">
                  <div className="flex items-center">Cód. Infra</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Centro Escolar</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Municipio</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Sector</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Últ. modificación</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length >= 1
                ? searchResults.map((item) => <DirectoryTableItem key={item.id} item={item} />)
                : resp.data.map((item) => <DirectoryTableItem key={item.id} item={item} />)}
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
    </>
  )
}
