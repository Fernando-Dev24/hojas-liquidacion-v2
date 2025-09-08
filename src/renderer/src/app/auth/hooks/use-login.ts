import { useState } from 'react'
import { useForm } from 'react-hook-form'

export interface FormValues {
  username: string
  password: string
}

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormValues>()

  /* STATES */
  const [seePassword, setSeePassword] = useState(false)

  /* FUNCTIONS */
  const toggleSeePassword = () => setSeePassword(!seePassword)

  return {
    register,
    handleSubmit,
    toggleSeePassword,
    seePassword,
    errors,
    isValid
  }
}
