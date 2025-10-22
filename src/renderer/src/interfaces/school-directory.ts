import { municipios } from '@renderer/data/municipios/municipios-san-salvador'
import z from 'zod'

export type Sector = 'PÚBLICO' | 'PRIVADO'

export interface SchoolDirectoryEntry {
  id: string
  infra: string
  name: string
  sector: Sector
  municipio: string
  nit: string
  createdAt: Date
  updatedAt: Date
}

export interface SchoolDirectoryForm {
  infra: string
  name: string
  sector: string
  municipio: string
  nit: string
}

interface OptionType {
  value: string
  label: string
}

interface InputType {
  component: 'input' | 'select' | 'controller'
  name: keyof SchoolDirectoryForm
  label: string
  wrapperClassName?: string
  options?: OptionType[]
  focus?: boolean
}

export const directoryFormValues: InputType[] = [
  {
    component: 'input',
    name: 'infra',
    label: 'Cód. Infraestructura',
    focus: true
  },
  {
    component: 'input',
    name: 'name',
    label: 'Nombre del centro escolar'
  },
  {
    component: 'select',
    name: 'sector',
    label: 'Pertenece al sector',
    options: [
      { value: 'PÚBLICO', label: 'PÚBLICO' },
      { value: 'PRIVADO', label: 'PRIVADO' }
    ]
  },
  {
    component: 'select',
    name: 'municipio',
    label: 'Municipio',
    options: municipios
  },
  {
    component: 'controller',
    name: 'nit',
    label: 'NIT',
    wrapperClassName: 'col-span-full mb-20'
  }
]

export const directoryValidationSchema = z.object({
  infra: z.string().min(3),
  name: z.string(),
  sector: z.enum(['PÚBLICO', 'PRIVADO']),
  municipio: z.string(),
  nit: z.string()
})
