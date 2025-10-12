import { dbPromise } from '@renderer/config/firebase'
import { UserForm, userSchema } from '@renderer/interfaces'
import { doc, updateDoc } from 'firebase/firestore'

interface Params {
  id: string | null
  values: UserForm
}

export const onEditUser = async ({ id, values }: Params) => {
  if (!id) {
    return { ok: false, message: 'No se pudo editar el usuario' }
  }

  /* Validar los datos */
  const { data, success } = userSchema.safeParse(values)
  if (!success || !data) {
    return {
      ok: false,
      message: 'Datos ingresados inválidos'
    }
  }

  const updatedDate = {
    ...data,
    roles: [data.roles]
  }

  try {
    const db = await dbPromise
    const docRef = doc(db, 'users', id)
    await updateDoc(docRef, { ...updatedDate })

    return {
      ok: true,
      message: 'Usuario editado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo editar el usuario'
    }
  }
}
