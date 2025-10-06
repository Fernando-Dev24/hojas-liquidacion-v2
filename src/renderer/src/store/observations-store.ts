import { ObservationPage } from '@renderer/interfaces'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  observations: ObservationPage[]
  totalPages: number
  currentPage: number

  /* FUNCTIONS */
  setObservations: (observations: ObservationPage[]) => void
  setTotalPages: (totalPages: number) => void
  triggerCurrentPage: (action: 'next' | 'prev' | 'reset') => void
}

const initialState = {
  observations: [],
  totalPages: 0,
  currentPage: 1
}

export const useObservationsStore = create<State>()(
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
    }
  }))
)
