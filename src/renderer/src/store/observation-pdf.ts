import { ObservationPDFSchema } from '@renderer/interfaces'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  pdfSchema: ObservationPDFSchema | null
  setSchema: (schema: ObservationPDFSchema) => void
}

export const useObservationPDFShema = create<State>()(
  devtools((set) => ({
    pdfSchema: null,

    /* FUNCTIONS */
    setSchema: (schema: ObservationPDFSchema) => {
      set({ pdfSchema: schema })
    }
  }))
)
