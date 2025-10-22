import { dbPromise } from '@renderer/config/firebase'
import { directoryValidationSchema, SchoolDirectoryForm } from '@renderer/interfaces'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

interface Params {
  values: SchoolDirectoryForm
}

export const onCreateDirectory = async ({ values }: Params) => {
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
    const collectionRef = collection(db, 'directories')
    await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    return {
      ok: true,
      message: 'Directorio creado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al crear el directorio'
    }
  }
}
