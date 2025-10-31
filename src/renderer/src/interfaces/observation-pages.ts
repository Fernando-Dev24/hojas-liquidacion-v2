export interface ObservationPage {
  amount: number
  category: 'PAQUETES' | 'FINANCIERO'
  created: number
  createdBy: string
  date: Date
  department: string
  filledBy: string
  infra: string
  observations: Observation[]
  id: string
  reportId: number
  school_name: string
  isCompleted: boolean
}

export interface Observation {
  id: string
  observation_content: string
  observation_place: string
  observation_state: string
}

export interface ObservationPageFormValues {
  id: string | null
  reportId: number | null
  infra: string
  date: Date
  school_name: string
  department: string
  amount: number | string
  filledBy: string
  category: 'PAQUETES' | 'FINANCIERO'
  observations: Observation[]
  created?: number | null
  createdBy?: string | null
  isCompleted: boolean
}

export interface UpdateFormValues {
  label: string
  name: keyof ObservationPageFormValues
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | string
  placeholder: string
  component: 'input' | 'select' | 'datepicker'
  className?: string
  wrapperClassName?: string
  options?: Option[]
  [x: string]: any
}

export interface Option {
  label: string
  value: string
}
