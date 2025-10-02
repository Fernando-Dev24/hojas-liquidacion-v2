import z from 'zod'
import type { ObservationPageFormValues } from '@renderer/interfaces'
import { toast } from 'react-toastify'
import { dbPromise } from '@renderer/config/firebase'
import { doc, updateDoc } from 'firebase/firestore'

interface Params {
  data: ObservationPageFormValues
  action: 'create' | 'update'
}

/* SCHEMA DE OBSERVATION ITEM */
const observation_item_schema = z.object({
  id: z.string(),
  observation_content: z.string(),
  observation_place: z.string(),
  observation_state: z.string()
})

/* VALIDAR SI LA ESTRUCTURA DEL OBJETO ES LA VALIDA */
const data_schema = z.object({
  id: z.string().nullable(),
  reportId: z.number().nullable(),
  infra: z.string().min(1),
  date: z.date(),
  school_name: z.string().min(1),
  department: z.string().min(1),
  amount: z.string().min(1),
  filledBy: z.string().min(1),
  category: z.enum(['PAQUETES', 'FINANCIERO']),
  observations: z.array(observation_item_schema),
  created: z.number().nullable(),
  createdBy: z.string().nullable()
})

export const onSave = async ({ data, action }: Params) => {
  // VALIDAR SI LA ESTRUCTURA DEL OBJETO ES LA VALIDA, NO IMPORTA SI ES PARA CREAR O PARA VALIDAR
  const validation = data_schema.safeParse({
    ...data,
    amount: String(data.amount)
  })
  if (!validation.success) {
    console.log(validation.error)
    return {
      ok: false,
      message: 'Error al validar los datos, por favor revise los campos'
    }
  }

  if (action === 'update') await onUpdate(validation.data)
  return {
    ok: true,
    message: `${action === 'update' ? 'Actualizado' : 'Creado'} correctamente`
  }
}

export const onUpdate = async (data: any) => {
  const id = data.id
  if (!id) return

  try {
    const db = await dbPromise
    const docRef = doc(db, 'observations_pages', id)
    await updateDoc(docRef, data)
    return
  } catch (error) {
    console.log(error)
  }
}
