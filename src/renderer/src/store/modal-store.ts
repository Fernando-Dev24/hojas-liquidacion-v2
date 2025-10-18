import { create } from 'zustand'

export interface ModalState {
  modals: {
    pdfModal: false
    consolidadoModal: false
    searchObservationModal: false
    createUserModal: false
    editUserModal: false
    newBookingModal: false
    editBookingModal: false
  }

  // FUNCTIONS
  toggleModal: (id: keyof ModalState['modals']) => void
}

export const useModals = create<ModalState>((set, get) => ({
  modals: {
    pdfModal: false,
    consolidadoModal: false,
    searchObservationModal: false,
    createUserModal: false,
    editUserModal: false,
    newBookingModal: false,
    editBookingModal: false
  },

  /* FUNCTIONS */
  toggleModal: (id: keyof ModalState['modals']) => {
    const { modals } = get()
    set({
      modals: {
        ...modals,
        [id]: !modals[id]
      }
    })
  }
}))
