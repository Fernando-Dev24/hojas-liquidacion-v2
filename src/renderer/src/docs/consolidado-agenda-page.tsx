import { DocHeader } from './doc-header'
import { useAgendaStore } from '@renderer/store'
import { useEffect } from 'react'
import { ConsolidadoAgendaTable } from './agenda/consolidado-agenda-table'
import { orderBookings } from './helpers/orderBookings'

export const ConsolidadoAgendaPage = () => {
  const { filterBy, orderBy, bookings, setOrderedBookings } = useAgendaStore()

  useEffect(() => {
    const { filteredItems } = orderBookings({
      filterBy,
      orderBy,
      bookings
    })

    setOrderedBookings(filteredItems)
  }, [orderBy])

  return (
    <section>
      <article className="page" id="page">
        <DocHeader>
          <p className="text-[10px]">
            DEPARTAMENTAL DE EDUCACIÓN - SAN SALVADOR - UNIDAD DE PRESUPUESTO Y LIQUIDACIONES
          </p>
          <h5 className="text-[14px] font-semibold">
            CONSOLIDADO DE INSTITUCIONES QUE HAN AGENDADO <br /> SU PROCESO DE LIQUIDACIÓN
          </h5>
        </DocHeader>

        <ConsolidadoAgendaTable />
      </article>
    </section>
  )
}
