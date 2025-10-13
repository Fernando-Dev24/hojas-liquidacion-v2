import { dbPromise } from '@renderer/config/firebase'
import { AdminConfig } from '@renderer/interfaces/admin'
import { doc, updateDoc } from 'firebase/firestore'
import z from 'zod'

const adminConfigSchema = z.object({
  paquetesLimit: z.string(),
  financieroLimit: z.string()
})

export const updateAdminConfig = async (values: AdminConfig) => {
  const { data, error } = adminConfigSchema.safeParse(values)

  if (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al aplicar los cambios'
    }
  }

  try {
    const db = await dbPromise
    const docRef = doc(db, 'config', 'admin-config')
    await updateDoc(docRef, { ...data })

    return {
      ok: true,
      message: 'Cambios aplicados correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al aplicar los cambios'
    }
  }
}
