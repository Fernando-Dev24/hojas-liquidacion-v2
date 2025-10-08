import { dbPromise } from '@renderer/config/firebase'
import { deleteDoc, doc } from 'firebase/firestore'

export const onDelete = async (id: string) => {
  if (!id) return

  try {
    const db = await dbPromise
    const docRef = doc(db, 'observations_pages', id)
    await deleteDoc(docRef)
  } catch (error) {
    console.log(error)
    throw new Error('Error al eliminar el elemento')
  }
}
