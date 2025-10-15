import { Timestamp } from 'firebase/firestore'

export type Filter = 'PAQUETES' | 'FINANCIERO'

export interface Booking {
  bookingDepartment: Filter
  created_by: string
  description: string
  id: string
  infra: string
  rubro: string
  school_name: string
  state: string
  total: number
  visitDate: Date | Timestamp
}
