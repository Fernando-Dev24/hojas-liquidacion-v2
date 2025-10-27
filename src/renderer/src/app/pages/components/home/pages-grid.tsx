import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Pagination, Error } from '@renderer/components'
import { GridItem } from './grid-item'
import { useObservationsStore } from '@renderer/store'
import { getPaginatedData } from '@renderer/app/actions'
import { HomeSkeleton } from './HomeSkeleton'

export const PagesGrid = () => {
  const { currentPage, totalPages, setObservations, setTotalPages, triggerCurrentPage } =
    useObservationsStore((state) => state)

  const {
    data: resp,
    isLoading,
    error
  } = useQuery({
    queryKey: ['observations-pages', currentPage],
    queryFn: () =>
      getPaginatedData({
        collName: 'observations_pages',
        page: currentPage,
        take: 25
      })
  })

  useEffect(() => {
    if (resp) {
      setObservations(resp?.data ?? [])
      setTotalPages(resp?.totalPages)
    }
  }, [, currentPage, isLoading])

  if (isLoading || !resp?.data) return <HomeSkeleton />
  if (error) return <Error errorLabel="las hojas de observaciones" />

  return (
    <>
      <article className="container my-30">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-600 text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-5">
                  INFRA
                </th>
                <th scope="col" className="px-6 py-5">
                  CENTRO ESCOLAR
                </th>
                <th scope="col" className="px-6 py-5">
                  RUBRO
                </th>
                <th scope="col" className="px-6 py-5">
                  MONTO
                </th>
                <th scope="col" className="px-6 py-5">
                  CREADO POR
                </th>
                <th scope="col" className="px-6 py-5">
                  FECHA
                </th>
                <th scope="col" className="px-6 py-5">
                  ACCIONES
                </th>
              </tr>
            </thead>
            <tbody>
              {resp.data.map((item) => (
                <GridItem data={item} key={item.id} />
              ))}
            </tbody>
          </table>
          <div className="px-6 py-5 text-white inset-shadow-teal-50 bg-secondary/85 border-t border-secondary/85">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              triggerCurrentPage={triggerCurrentPage}
            />
          </div>
        </div>
      </article>
    </>
  )
}
