import { BookingForm, bookingValidationSchema } from '@renderer/interfaces'

interface Params {
  values: BookingForm
  username: string | null
}

export const onCreateBooking = async ({ values, username }: Params) => {
  if (!username)
    return {
      ok: false,
      message: 'Nombre de usuario invalido'
    }

  try {
    const { data, error } = bookingValidationSchema.safeParse(values)
    if (error) {
      return {
        ok: false,
        message: 'Error al validar los datos'
      }
    }

    console.log('Creando...')
    return
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al crear el registro'
    }
  }
}
