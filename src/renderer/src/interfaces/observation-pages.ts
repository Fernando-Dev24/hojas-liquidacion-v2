export interface ObservationPage {
  amount: number
  category: string
  created: number
  createdBy: string
  date: Date
  department: string
  filledBy: string
  infra: number
  observations: Observation[]
  id: string
  reportId: string
  school_name: string
}

export interface Observation {
  id: string
  observation_content: string
  observation_place: string
  observation_state: string
}

export interface ObservationPageFormValues {
  id?: string
  reportId?: string
  infra: number
  date: Date
  school_name: string
  department: string
  amount: number
  filledBy: string
  category: 'PAQUETES' | 'FINANCIERO'
  observations: Observation[]
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
