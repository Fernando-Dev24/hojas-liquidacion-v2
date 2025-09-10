import { UpdateFormValues } from '@renderer/interfaces'

export const updateFormInputs: UpdateFormValues[] = [
  {
    label: 'Cód. Infra',
    component: 'input',
    name: 'infra',
    type: 'text',
    placeholder: 'Código de Infraestructura'
  },
  {
    label: 'Fecha',
    component: 'datepicker',
    name: 'date',
    type: 'date',
    placeholder: 'Fecha'
  },
  {
    label: 'Nombre del Centro Escolar',
    component: 'input',
    name: 'school_name',
    type: 'text',
    placeholder: 'Nombre del Centro Escolar'
  },
  {
    label: 'Rubro',
    component: 'input',
    name: 'department',
    placeholder: 'Escribe el rubro',
    type: 'text'
  },
  {
    label: 'Monto',
    component: 'input',
    name: 'amount',
    type: 'number',
    placeholder: 'Monto'
  },
  {
    label: 'Hoja llenada por',
    component: 'input',
    name: 'filledBy',
    type: 'text',
    placeholder: 'Nombre de quien llenó la hoja'
  },
  {
    label: 'Departamento',
    component: 'select',
    name: 'category',
    type: 'text',
    placeholder: 'Rubro',
    options: [
      {
        label: 'Paquetes',
        value: 'PAQUETES'
      },
      {
        label: 'Financiero',
        value: 'FINANCIERO'
      }
    ]
  }
]
