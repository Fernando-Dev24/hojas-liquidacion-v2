import { ObservationPage } from '@renderer/interfaces'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  observations: ObservationPage[]
  totalPages: number
  currentPage: number

  /* FUNCTIONS */
  setObservations: (observations: ObservationPage[]) => void
  setPagination: (totalPages: number, currentPage: number) => void
}

const initialState = {
  observations: [],
  totalPages: 0,
  currentPage: 1
}

export const useObservationsStore = create<State>()(
  devtools((set) => ({
    ...initialState,

    setObservations: (observations: ObservationPage[]) => set({ observations }),
    setPagination: (totalPages: number, currentPage: number) => set({ totalPages, currentPage })
  }))
)
