import { dbPromise } from '@renderer/config/firebase'
import { UserForm, userSchema } from '@renderer/interfaces'
import { addDoc, collection } from 'firebase/firestore'

export const onCreateUser = async (values: UserForm) => {
  const { data, success } = userSchema.safeParse(values)
  if (!success) {
    return {
      ok: false,
      message: 'Datos ingresados inválidos'
    }
  }

  const newData = {
    ...data,
    roles: [data.roles]
  }

  try {
    const db = await dbPromise
    const collectionRef = collection(db, 'users')
    await addDoc(collectionRef, newData)

    return {
      ok: true,
      message: 'Usuario creado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al crear usuario'
    }
  }
}
