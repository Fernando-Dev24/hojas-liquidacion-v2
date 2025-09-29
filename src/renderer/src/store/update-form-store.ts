import { generateUUID } from '@renderer/helpers'
import { Observation, ObservationPageFormValues } from '@renderer/interfaces'
import { ChangeEvent } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

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
  deleteItem: (id: string) => void
}

export const useUpdateForm = create<State>()(
  devtools((set, get) => ({
    form: {
      id: null,
      reportId: null,
      infra: '',
      date: new Date(),
      school_name: '',
      department: '',
      amount: 0,
      filledBy: '',
      category: 'PAQUETES',
      observations: []
    },

    /* FUNCTIONS */
    updateForm: (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { form } = get()
      const { name, value } = evt.target

      set({
        form: {
          ...form,
          [name]: value
        }
      })
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

    deleteItem: (id) => {
      const { form } = get()
      set({
        form: {
          ...form,
          observations: form.observations.filter((item) => item.id !== id)
        }
      })
    }
  }))
)
