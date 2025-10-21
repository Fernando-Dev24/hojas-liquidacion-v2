import { Booking, Filter } from '@renderer/interfaces'
import { AgendaStore } from '@renderer/store'

interface Params {
  filterBy: Filter
  orderBy: AgendaStore['orderBy']
  bookings: Booking[]
}

export const orderBookings = ({ filterBy, orderBy, bookings }: Params) => {
  // 1. Obtener primero las observaciones segun el filtro
  const filteredItems = bookings.filter((item) => item.bookingDepartment === filterBy)

  // 2. Ordenar las observaciones filtradas en orden ASC o DESC segun su numero de infra
  filteredItems.sort((a, b) => {
    return orderBy === 'ASC' ? Number(a.infra) - Number(b.infra) : Number(b.infra) - Number(a.infra)
  })

  return {
    filteredItems
  }
}
