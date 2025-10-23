import { dbPromise } from '@renderer/config/firebase'
import { directoryValidationSchema, SchoolDirectoryForm } from '@renderer/interfaces'
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'

interface Params {
  values: SchoolDirectoryForm
  id: string | null
}

export const onUpdateDirectory = async ({ values, id }: Params) => {
  if (!id) {
    return {
      ok: false,
      message: 'ID Invalido'
    }
  }

  const { data, error } = directoryValidationSchema.safeParse(values)
  if (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al validar los datos'
    }
  }

  try {
    const db = await dbPromise
    const docRef = doc(db, 'directories', id)
    await updateDoc(docRef, {
      ...values,
      ...data,
      updatedAt: serverTimestamp()
    })

    return {
      ok: true,
      message: 'Directorio modificado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al modificar el directorio'
    }
  }
}
