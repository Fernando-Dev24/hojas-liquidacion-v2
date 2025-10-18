import { dbPromise } from '@renderer/config/firebase'
import { deleteDoc, doc } from 'firebase/firestore'

export const onDeleteBooking = async (id: string) => {
  if (!id) return { ok: false, message: 'ID invalido' }

  try {
    const db = await dbPromise
    const docRef = doc(db, 'bookings', id)
    await deleteDoc(docRef)

    return {
      ok: true,
      message: 'Cita eliminada correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al eliminar la cita'
    }
  }
}
