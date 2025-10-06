import { create } from 'zustand'

export interface State {
  modals: {
    pdfModal: false
    consolidadoModal: false
  }
  filterBy: 'PAQUETES' | 'FINANCIERO'
  orderBy: 'ASC' | 'DESC'

  // FUNCTIONS
  toggleModal: (id: keyof State['modals']) => void
  setFilterBy: (filter: State['filterBy']) => void
  setOrder: () => void
}

export const useModals = create<State>((set, get) => ({
  modals: {
    pdfModal: false,
    consolidadoModal: false
  },
  filterBy: 'PAQUETES',
  orderBy: 'DESC',

  /* FUNCTIONS */
  toggleModal: (id: string) => {
    const { modals } = get()
    set({
      modals: {
        ...modals,
        [id]: !modals[id]
      }
    })
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
  }
}))
