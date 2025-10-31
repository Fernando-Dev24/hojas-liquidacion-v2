import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Error, Empty } from '@renderer/components'
import { GridItem } from './grid-item'
import { useObservationsStore } from '@renderer/store'
import { getPaginatedData } from '@renderer/app/actions'
import { HomeSkeleton } from './HomeSkeleton'
import { ObservationPagination } from './observation-pagination'

export const PagesGrid = () => {
  const {
    currentPage,
    totalPages,
    filterByCompleted,
    setObservations,
    setTotalPages,
    triggerCurrentPage
  } = useObservationsStore((state) => state)

  const {
    data: resp,
    isLoading,
    error
  } = useQuery({
    queryKey: ['observations-pages', currentPage, filterByCompleted],
    queryFn: () =>
      getPaginatedData({
        page: currentPage,
        take: 25,
        filterByCompleted
      })
  })

  useEffect(() => {
    if (resp) {
      setObservations(resp?.data ?? [])
      setTotalPages(resp?.totalPages)
    } else {
      setObservations([])
      setTotalPages(1)
    }
  }, [currentPage, isLoading])

  if (isLoading) return <HomeSkeleton />
  if (error) return <Error errorLabel="las hojas de observaciones" />

  return (
    <>
      <article className="container py-24">
        <div className="grid grid-cols-3 gap-5">
          {resp!.data.length < 1 && (
            <div className="col-span-3">
              <Empty renderBtn={false} />
            </div>
          )}

          {resp!.data.map((item) => (
            <GridItem key={item.id} data={item} />
          ))}
        </div>

        {resp?.data && (
          <div className="flex justify-center items-center my-10">
            <ObservationPagination
              totalPages={totalPages}
              currentPage={currentPage}
              triggerCurrentPage={triggerCurrentPage}
            />
          </div>
        )}
      </article>
    </>
  )
}
