import { ChangeEvent } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { generateUUID } from '@renderer/helpers'
import { INFRAS } from '@renderer/data/infras/infras'
import { Observation, ObservationPage, ObservationPageFormValues } from '@renderer/interfaces'

export type Evt = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

interface UpdateItem {
  id: string
  evt: Evt
}

interface State {
  form: ObservationPageFormValues
  updateForm: (evt: Evt) => void
  updateDate: (date: Date) => void
  insertItem: () => void
  updateItem: ({ id, evt }: UpdateItem) => void
  updateState: (newState: boolean) => void
  deleteItem: (id: string) => void
  setForm: (data: ObservationPage) => void
  reset: () => void
}

const formInitialState = {
  id: null,
  reportId: null,
  infra: '',
  date: new Date(),
  school_name: '',
  department: '',
  amount: 0,
  filledBy: '',
  category: 'PAQUETES' as const,
  observations: [],
  isCompleted: false
}

export const useUpdateForm = create<State>()(
  devtools((set, get) => ({
    form: {
      ...formInitialState
    },

    /* FUNCTIONS */
    updateForm: (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { form } = get()
      const { name, value } = evt.target

      if (name === 'infra') {
        const item = INFRAS.find((infra) => infra.code === Number(value))
        if (item) {
          set({
            form: {
              ...form,
              infra: value,
              school_name: item.name
            }
          })
        } else {
          set({
            form: {
              ...form,
              infra: value,
              school_name: ''
            }
          })
        }
      } else {
        set({
          form: {
            ...form,
            [name]: value
          }
        })
      }
    },

    updateDate: (date: Date) => {
      const { form } = get()

      set({
        form: {
          ...form,
          date
        }
      })
    },

    updateState: (newState: boolean) => {
      const { form } = get()
      set({
        form: {
          ...form,
          isCompleted: newState
        }
      })
    },

    updateItem: ({ id, evt }: UpdateItem) => {
      const { form } = get()
      const { name, value } = evt.target

      const updatedObservations = form.observations.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [name]: value
          }
        }

        return item
      })

      set({
        form: {
          ...form,
          observations: updatedObservations
        }
      })
    },

    insertItem: () => {
      const { form } = get()

      const newItem: Observation = {
        id: generateUUID(),
        observation_content: '',
        observation_place: '',
        observation_state: ''
      }

      set({
        form: {
          ...form,
          observations: [...form.observations, newItem]
        }
      })
    },

    deleteItem: (id) => {
      const { form } = get()
      set({
        form: {
          ...form,
          observations: form.observations.filter((item) => item.id !== id)
        }
      })
    },

    setForm: (data: ObservationPage) => {
      set({
        form: {
          ...data
        }
      })
    },

    reset: () => {
      set({
        form: {
          ...formInitialState
        }
      })
    }
  }))
)
