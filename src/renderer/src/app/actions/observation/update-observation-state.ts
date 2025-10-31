import { dbPromise } from '@renderer/config/firebase'
import { collection, doc, updateDoc } from 'firebase/firestore'

interface Params {
  id: string | null
  newState: boolean
}

export const updateObservationState = async ({ id, newState }: Params) => {
  if (!id) {
    return {
      ok: false,
      message: 'ID Invalido'
    }
  }

  try {
    const db = await dbPromise
    const docRef = doc(db, 'observations_pages', id)
    await updateDoc(docRef, {
      isCompleted: newState
    })

    return {
      ok: true,
      message: 'Actualizado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al modificar el documento'
    }
  }
}
