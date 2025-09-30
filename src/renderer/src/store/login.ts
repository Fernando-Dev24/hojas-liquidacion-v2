import { User } from '@renderer/interfaces'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  user: User | null
  status: 'not-authenticated' | 'authenticated'

  setUser: (user: User) => void
  reset: () => void
}

const initialState = {
  user: null,
  status: 'not-authenticated' as const
}

export const useLogin = create<State>()(
  devtools((set) => ({
    ...initialState,

    setUser: (user: User) => {
      set({ user, status: 'authenticated' })
    },

    reset: () => {
      set(initialState)
    }
  }))
)
