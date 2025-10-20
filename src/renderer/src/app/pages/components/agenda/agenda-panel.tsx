import { getPaginatedBookings } from '@renderer/app/actions'
import { Empty, Pagination } from '@renderer/components'
import { useAgendaStore, useModals } from '@renderer/store'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { AgendaPanelItem } from './agenda-panel-item'
import { AgendaSearchbar } from './agenda-searchbar'

export const AgendaPanel = () => {
  const { currentPage, totalPages, filterBy, setPagination, triggerPages } = useAgendaStore()
  const { toggleModal } = useModals()
  const {
    data: resp,
    isLoading,
    error
  } = useQuery({
    queryKey: ['agenda', currentPage, filterBy],
    queryFn: () =>
      getPaginatedBookings({
        page: currentPage,
        take: 10,
        filterBy
      })
  })

  useEffect(() => {
    if (resp) setPagination(resp.totalPages)
  }, [isLoading])

  if (isLoading || !resp?.data) return <p>Cargando...</p>
  if (error) return <p>Error al cargar las citas</p>

  return (
    <section className="py-14">
      <AgendaSearchbar />

      {/* DATA */}
      {resp.data.length < 1 && <Empty renderBtn={true} fn={() => toggleModal('newBookingModal')} />}
      {resp.data.length > 0 &&
        resp.data.map((booking) => <AgendaPanelItem key={booking.id} booking={booking} />)}

      {/* PAGINATION */}
      {resp.data.length > 0 && (
        <div className="mt-10 text-white">
          <Pagination
            textColor="font-medium text-secondary"
            currentPage={currentPage}
            totalPages={totalPages}
            triggerCurrentPage={triggerPages}
          />
        </div>
      )}
    </section>
  )
}
