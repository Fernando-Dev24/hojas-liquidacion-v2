import { toast } from 'react-toastify'
import type { FormValues } from '../../auth/hooks/use-login'
import z from 'zod'
import { getUserByName } from './get-user-by-name'

const login_schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3)
})

export const onLogin = async (values: FormValues) => {
  const { data, success } = login_schema.safeParse(values)

  if (!success) {
    toast.error('Datos ingresados inválidos')
    return null
  }

  // Login
  try {
    const { username, password } = data
    const toastId = toast.loading('Iniciando sesión...')
    const user = await getUserByName({ username, password })

    if (!user) {
      toast.update(toastId, {
        render: 'Usuario o contraseña incorrectos',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
        closeButton: true,
        closeOnClick: true
      })
      return null
    }

    // setear usuario y password en local
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)

    toast.dismiss(toastId)

    return user
  } catch (error) {
    console.log(error)
    throw error
  }
}
