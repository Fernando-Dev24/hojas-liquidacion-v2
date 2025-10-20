import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { PaginationActions } from './observations-store'
import { Booking, Filter } from '@renderer/interfaces'

interface AgendaStore {
  currentPage: number
  totalPages: number
  bookingToEdit: Booking | null
  filterBy: Filter
  searchResults: Booking[]

  setPagination: (totalPages: number) => void
  setFilterBy: (filterBy: Filter) => void
  setBookingToEdit: (booking: Booking | null) => void
  triggerPages: (action: PaginationActions) => void
  setSearchResults: (results: Booking[]) => void
}

export const useAgendaStore = create<AgendaStore>()(
  devtools((set, get) => ({
    currentPage: 1,
    totalPages: 0,
    filterBy: 'PAQUETES',
    bookingToEdit: null,
    limits: {
      paquetes: true,
      financiero: true
    },
    searchResults: [],

    setPagination: (totalPages: number) => set({ totalPages }),
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
    setSearchResults: (results: Booking[]) => set({ searchResults: results })
  }))
)
