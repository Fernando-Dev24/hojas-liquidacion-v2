import z from 'zod'

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
  visitDate: Date
}

export interface BookingForm {
  bookingDepartment: Filter
  description: string
  infra: string
  rubro: string
  school_name: string
  total: number
  visitDate: Date
  createdAt: Date
}

export interface BookingOpt {
  value: string
  label: string
}

export interface BookingFormEntry {
  id: keyof BookingForm
  label: string
  component: 'input' | 'select' | 'textarea' | 'datepicker'
  type: string
  options?: BookingOpt[]
  wrapperClassName?: string
}

export const bookingFormSchema: BookingFormEntry[] = [
  {
    id: 'infra',
    label: 'Cód. Infra',
    component: 'input',
    type: 'text'
  },
  {
    id: 'school_name',
    label: 'Nombre de la escuela',
    component: 'input',
    type: 'text'
  },
  {
    id: 'visitDate',
    label: 'Fecha a visitar',
    component: 'datepicker',
    type: 'date'
  },
  {
    id: 'rubro',
    label: 'Rubro',
    component: 'input',
    type: 'text'
  },
  {
    id: 'total',
    label: 'Total',
    component: 'input',
    type: 'number'
  },
  {
    id: 'bookingDepartment',
    label: 'Departamento que realizará la visita',
    component: 'select',
    type: 'text',
    options: [
      {
        value: 'PAQUETES',
        label: 'Paquetes'
      },
      {
        value: 'FINANCIERO',
        label: 'Financiero'
      }
    ]
  },
  {
    id: 'description',
    label: 'Escribe detalles adicionales de la visita',
    component: 'textarea',
    wrapperClassName: 'col-span-full',
    type: 'text'
  }
]

export const bookingValidationSchema = z.object({
  bookingDepartment: z.enum(['PAQUETES', 'FINANCIERO']),
  description: z.string(),
  infra: z.string().min(3, 'Campo requerido'),
  school_name: z.string().min(1, 'Campo requerido'),
  visitDate: z.date()
})
