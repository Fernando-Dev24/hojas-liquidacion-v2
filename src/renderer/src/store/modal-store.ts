import { create } from 'zustand'

export interface State {
  modals: {
    pdfModal: false
  }

  // FUNCTIONS
  toggleModal: (id: keyof State['modals']) => void
}

export const useModals = create<State>((set, get) => ({
  modals: {
    pdfModal: false
  },

  /* FUNCTIONS */
  toggleModal: (id: string) => {
    const { modals } = get()
    set({
      modals: {
        ...modals,
        [id]: !modals[id]
      }
    })
  }
}))
