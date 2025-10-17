import { dbPromise } from '@renderer/config/firebase'
import { BookingForm, bookingValidationSchema, Filter } from '@renderer/interfaces'
import { addDoc, collection, getCountFromServer, query, Timestamp, where } from 'firebase/firestore'
import { getAdminConfig } from '../admin/get-admin-config'
import { endOfDay, parseISO, startOfDay } from 'date-fns'

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
      console.log(error)
      return {
        ok: false,
        message: 'Error al validar los datos'
      }
    }

    const db = await dbPromise
    const isAllowed = await validateLimit(data.bookingDepartment, db)

    if (!isAllowed) {
      return {
        ok: false,
        message: `Limite de citas ${data.bookingDepartment.toLowerCase()} alcanzado`
      }
    }
    const collectionRef = collection(db, 'bookings')
    await addDoc(collectionRef, {
      ...data,
      ...values,
      created_by: username,
      createdAt: Timestamp.fromDate(new Date())
    })

    return {
      ok: true,
      message: 'Registro creado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al crear el registro'
    }
  }
}

const validateLimit = async (category: Filter, db: any) => {
  try {
    // Obtener limite de la configuracion de admin
    const limits = await getAdminConfig()
    if (!limits) return false

    // Validar si el limite no esta definido, si es asi, todas las citas podran agendarse
    if (category === 'PAQUETES' && limits.paquetes === 'no-limit') return true
    if (category === 'FINANCIERO' && limits.financiero === 'no-limit') return true

    // Si el limite esta definido hay que:
    // done: 1. obtener el total de citas agendadas en el dia segun su categoria
    // done: 2. Validar si hay cupo todavia para crear la cita o no
    const d = parseISO(new Date().toISOString())
    const startDay = Timestamp.fromDate(startOfDay(d))
    const endDay = Timestamp.fromDate(endOfDay(d))

    const collectionRef = collection(db, 'bookings')
    const q = query(
      collectionRef,
      where('bookingDepartment', '==', category),
      where('createdAt', '>=', startDay),
      where('createdAt', '<=', endDay)
    )

    const snap = await getCountFromServer(q)
    const total = snap.data().count
    switch (category) {
      case 'PAQUETES':
        return total < +limits.paquetes
      case 'FINANCIERO':
        return total < +limits.financiero
      default:
        return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}
