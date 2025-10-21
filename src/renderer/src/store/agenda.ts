import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { PaginationActions } from './observations-store'
import { Booking, Filter } from '@renderer/interfaces'

export interface AgendaStore {
  currentPage: number
  totalPages: number
  bookings: Booking[]
  bookingToEdit: Booking | null
  filterBy: Filter
  searchResults: Booking[]
  orderedBookings: Booking[]
  orderBy: 'ASC' | 'DESC'

  setPagination: (totalPages: number, bookings: Booking[]) => void
  setFilterBy: (filterBy: Filter) => void
  setBookingToEdit: (booking: Booking | null) => void
  triggerPages: (action: PaginationActions) => void
  setSearchResults: (results: Booking[]) => void
  setOrderedBookings: (bookings: Booking[]) => void
  setOrder: () => void
}

export const useAgendaStore = create<AgendaStore>()(
  devtools((set, get) => ({
    currentPage: 1,
    totalPages: 0,
    bookings: [],
    filterBy: 'PAQUETES',
    bookingToEdit: null,
    limits: {
      paquetes: true,
      financiero: true
    },
    searchResults: [],
    orderedBookings: [],

    setPagination: (totalPages: number, bookings: Booking[]) => set({ totalPages, bookings }),
    setFilterBy: (filterBy: Filter) => set({ filterBy }),
    setBookingToEdit: (booking: Booking) => {
      set({ bookingToEdit: booking })
    },
    triggerPages: (action: PaginationActions) => {
      const { currentPage } = get()

      switch (action) {
        case 'next':
          set({ currentPage: currentPage + 1 })
          break
        case 'prev':
          set({ currentPage: currentPage - 1 })
          break
        case 'reset':
          set({ currentPage: 1 })
          break
        default:
          set({ currentPage: 1 })
          break
      }
    },
    setSearchResults: (results: Booking[]) => set({ searchResults: results }),
    setOrderedBookings: (bookings: Booking[]) => set({ orderedBookings: bookings }),
    setOrder: () => {
      const { orderBy } = get()
      set({
        orderBy: orderBy === 'ASC' ? 'DESC' : 'ASC'
      })
    }
  }))
)
