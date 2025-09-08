import { toast } from 'react-toastify'
import { FormValues } from '../hooks/use-login'
import z from 'zod'

const login_schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3)
})

export const onLogin = (values: FormValues) => {
  const { data, success } = login_schema.safeParse(values)

  if (!success) {
    toast.error('Datos ingresados inválidos')
    return
  }

  // Login
  console.log({ data })
}
