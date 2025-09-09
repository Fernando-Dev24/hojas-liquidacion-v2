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
