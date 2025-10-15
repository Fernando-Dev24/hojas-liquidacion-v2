import { ObservationPage } from '@renderer/interfaces'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type PaginationActions = 'next' | 'prev' | 'reset'

export interface ObservationState {
  observations: ObservationPage[]
  orderedObservations: ObservationPage[]
  searchResults: ObservationPage[]
  totalPages: number
  currentPage: number
  filterBy: 'PAQUETES' | 'FINANCIERO'
  orderBy: 'ASC' | 'DESC'
  totalDebt: number

  /* FUNCTIONS */
  setObservations: (observations: ObservationPage[]) => void
  setTotalPages: (totalPages: number) => void
  triggerCurrentPage: (action: PaginationActions) => void
  setFilterBy: (filter: ObservationState['filterBy']) => void
  setOrder: () => void
  setConsolidadoData: (orderedObs: ObservationPage[], total: number) => void
  setSearchResults: (results: ObservationPage[]) => void
}

const initialState = {
  observations: [],
  orderedObservations: [],
  searchResults: [],
  totalPages: 0,
  currentPage: 1,
  filterBy: 'PAQUETES',
  orderBy: 'ASC',
  totalDebt: 0
}

export const useObservationsStore = create<ObservationState>()(
  devtools((set, get) => ({
    ...initialState,

    setObservations: (observations: ObservationPage[]) => set({ observations }),

    setTotalPages: (totalPages: number) => {
      set({ totalPages })
    },

    triggerCurrentPage: (action: 'next' | 'prev' | 'reset') => {
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

    setFilterBy: (filter) => {
      set({
        filterBy: filter
      })
    },

    setOrder: () => {
      const { orderBy } = get()

      set({
        orderBy: orderBy === 'ASC' ? 'DESC' : 'ASC'
      })
    },

    setConsolidadoData: (orderedObs: ObservationPage[], total: number) => {
      set({
        orderedObservations: orderedObs,
        totalDebt: total
      })
    },

    setSearchResults: (results: ObservationPage[]) => {
      set({
        searchResults: results
      })
    }
  }))
)
