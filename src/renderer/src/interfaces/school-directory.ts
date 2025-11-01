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
  headmasterName: string
  headmasterEmail: string
  headmasterPhone: string
  createdAt: Date
  updatedAt: Date
}

export interface SchoolDirectoryForm {
  infra: string
  name: string
  sector: string
  municipio: string
  nit: string
  headmasterName: string
  headmasterEmail: string
  headmasterPhone: string
}

interface OptionType {
  value: string
  label: string
}

interface InputType {
  component: 'input' | 'select' | 'controller'
  name: keyof SchoolDirectoryForm
  type: 'text' | 'email'
  label: string
  wrapperClassName?: string
  options?: OptionType[]
  focus?: boolean
  mask?: string
}

export const directoryFormValues: InputType[] = [
  {
    component: 'input',
    type: 'text',
    name: 'infra',
    label: 'Cód. Infraestructura',
    focus: true
  },
  {
    component: 'input',
    type: 'text',
    name: 'name',
    label: 'Nombre del centro escolar'
  },
  {
    component: 'select',
    type: 'text',
    name: 'sector',
    label: 'Pertenece al sector',
    options: [
      { value: 'PÚBLICO', label: 'PÚBLICO' },
      { value: 'PRIVADO', label: 'PRIVADO' }
    ]
  },
  {
    component: 'select',
    type: 'text',
    name: 'municipio',
    label: 'Municipio',
    options: municipios
  },
  {
    component: 'controller',
    type: 'text',
    name: 'nit',
    label: 'NIT',
    mask: '0000-000000-000-0'
  },
  {
    component: 'input',
    type: 'text',
    name: 'headmasterName',
    label: 'Nombre del director'
    // wrapperClassName: 'col-span-full mb-20'
  },
  {
    component: 'input',
    type: 'email',
    name: 'headmasterEmail',
    label: 'Correo electronico del director'
    // wrapperClassName: 'col-span-full mb-20'
  },
  {
    component: 'controller',
    type: 'email',
    name: 'headmasterPhone',
    label: 'Tél. del Director',
    mask: '0000-0000',
    wrapperClassName: 'mb-20'
  }
]

export const directoryValidationSchema = z.object({
  infra: z.string().min(3),
  name: z.string(),
  sector: z.enum(['PÚBLICO', 'PRIVADO']),
  municipio: z.string(),
  headmasterName: z.string().min(3),
  headmasterEmail: z.email(),
  headmasterPhone: z.string().min(3)
})
