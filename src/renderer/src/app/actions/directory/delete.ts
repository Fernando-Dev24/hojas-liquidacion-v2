import { dbPromise } from '@renderer/config/firebase'
import { deleteDoc, doc } from 'firebase/firestore'

export const onDeleteDirectory = async (id: string) => {
  try {
    const db = await dbPromise
    const docRef = doc(db, 'directories', id)
    await deleteDoc(docRef)

    return {
      ok: true,
      message: 'Directorio eliminado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al eliminar el directorio'
    }
  }
}
