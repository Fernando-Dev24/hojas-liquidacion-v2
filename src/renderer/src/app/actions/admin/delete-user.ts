import { dbPromise } from '@renderer/config/firebase'
import { deleteDoc, doc } from 'firebase/firestore'

export const onDeleteUser = async (id: string) => {
  if (!id) {
    return {
      ok: false,
      message: 'ID invalido'
    }
  }

  try {
    const db = await dbPromise
    const docRef = doc(db, 'users', id)
    await deleteDoc(docRef)

    return {
      ok: true,
      message: 'Usuario eliminado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al eliminar el usuario'
    }
  }
}
