import { dbPromise } from '@renderer/config/firebase'
import { deleteDoc, doc } from 'firebase/firestore'

export const onDelete = async (id: string | null) => {
  if (!id)
    return {
      ok: false,
      message: 'ID invalido'
    }

  try {
    const db = await dbPromise
    const docRef = doc(db, 'observations_pages', id)
    await deleteDoc(docRef)

    return { ok: true, message: 'Registro eliminado correctamente' }
  } catch (error) {
    console.log(error)
    return { ok: false, message: 'Error al eliminar el registro' }
  }
}
