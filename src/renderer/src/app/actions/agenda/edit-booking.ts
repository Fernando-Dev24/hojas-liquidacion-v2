import { dbPromise } from '@renderer/config/firebase'
import { BookingForm, bookingValidationSchema } from '@renderer/interfaces'
import { doc, updateDoc } from 'firebase/firestore'

interface Params {
  values: BookingForm
  id: string | null
}

export const onEditBooking = async ({ values, id }: Params) => {
  if (!id) {
    return {
      ok: false,
      message: 'ID a modificar invalido'
    }
  }

  const { data, error } = bookingValidationSchema.safeParse(values)
  if (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al validar los datos'
    }
  }

  try {
    const db = await dbPromise
    const docRef = doc(db, 'bookings', id)
    await updateDoc(docRef, { ...data, ...values })

    return {
      ok: true,
      message: 'Registro modificado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al modificar el registro'
    }
  }
}
