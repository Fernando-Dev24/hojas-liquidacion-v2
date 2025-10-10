interface UserInput {
  name: 'username' | 'password' | 'roles'
  placeholder: string
  type: string
  component: 'input' | 'select'
  options?: RoleOption[]
}

interface RoleOption {
  value: string
  label: string
}

const options: RoleOption[] = [
  { value: 'liquidador', label: 'Liquidador' },
  { value: 'agendador_paquetes', label: 'Agendador Paquetes' },
  { value: 'agendador_financiero', label: 'Agendador Financiero' },
  { value: 'admin', label: 'Administrador' }
]

export const userDataInputs: UserInput[] = [
  {
    name: 'username',
    placeholder: 'Nombre de usuario',
    type: 'text',
    component: 'input'
  },
  {
    name: 'password',
    placeholder: 'Contraseña',
    type: 'string',
    component: 'input'
  },
  {
    name: 'roles',
    placeholder: 'Roles del usuario',
    type: 'string',
    component: 'select',
    options
  }
]
