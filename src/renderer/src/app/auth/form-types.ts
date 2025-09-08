interface FormInput {
  placeholder: string
  type: 'username' | 'password'
  label: string
}

export const formInputs: FormInput[] = [
  {
    placeholder: 'Nombre de usuario',
    type: 'username',
    label: 'Nombre de usuario'
  },
  {
    placeholder: 'Contraseña',
    type: 'password',
    label: 'Contraseña'
  }
]
