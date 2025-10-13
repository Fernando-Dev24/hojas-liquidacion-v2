import z from 'zod'
import type { ObservationPageFormValues } from '@renderer/interfaces'
import { dbPromise } from '@renderer/config/firebase'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { getUnixTime } from 'date-fns'

interface Params {
  data: ObservationPageFormValues
  username: string
  action: 'create' | 'update'
}

/* VALIDAR SI LA ESTRUCTURA DEL OBJETO ES LA VALIDA */
const data_schema = z.object({
  infra: z.string().min(1),
  date: z.date(),
  school_name: z.string().min(1),
  department: z.string().min(1),
  amount: z.string().min(1)
})

export const onSave = async ({ data, username, action }: Params) => {
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

  const completeData = {
    ...validation.data,
    ...data
  }

  try {
    if (action === 'update') await onUpdate(completeData).catch()
    if (action === 'create') await onCreate(completeData, username)
    return {
      ok: true,
      message: `${action === 'update' ? 'Actualizado' : 'Creado'} correctamente`
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al guardar los datos'
    }
  }
}

export const onUpdate = async (data: any) => {
  const id = data.id
  if (!id) return

  try {
    const db = await dbPromise
    const docRef = doc(db, 'observations_pages', id)
    await updateDoc(docRef, data)
  } catch (error) {
    console.log(error)
  }
}

export const onCreate = async (data: any, username: string) => {
  // ELIMINAMOS EL FIELD DE ID, REPORTID,
  delete data.id
  delete data.reportId

  try {
    // Obtenemos el correlativo a usar de la base de datos
    const db = await dbPromise
    const docRef = doc(db, 'correlativo', 'correlativo_hojas')
    const correlativoDoc = await getDoc(docRef)
    let resp = correlativoDoc.data()

    const newReportData = {
      ...data,
      reportId: resp?.correlativo,
      createdBy: username,
      createdAt: getUnixTime(new Date())
    }

    const collectionRef = collection(db, 'observations_pages')
    await addDoc(collectionRef, newReportData)
    await updateDoc(docRef, { correlativo: resp?.correlativo + 1 })
  } catch (error) {
    console.log(error)
  }
}
