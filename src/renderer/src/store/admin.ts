import { User } from '@renderer/interfaces'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AdminState {
  userToEdit: User | null

  setUserToEdit: (user: User) => void
  resetState: () => void
}

export const useAdminStore = create<AdminState>()(
  devtools((set) => ({
    userToEdit: null,

    setUserToEdit: (user: User) => {
      set({ userToEdit: user })
    },

    resetState: () => {
      set({ userToEdit: null })
    }
  }))
)
