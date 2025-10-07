import { dbPromise } from '@renderer/config/firebase'
import { endOfDay, parseISO, startOfDay } from 'date-fns'
import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore'

interface Params {
  searchByDate: boolean
  searchInfra: string
  searchDate: string
}

export const onSearch = async (params: Params) => {
  const { searchByDate, searchInfra, searchDate } = params

  try {
    let q
    const db = await dbPromise
    const collectionRef = collection(db, 'observations_pages')

    if (searchByDate) {
      // 1. Convertir la fecha que llega en un Timestamp entendible para firestore
      const day = parseISO(searchDate)
      const dayStart = startOfDay(day)
      const dayEnd = endOfDay(day)

      const startTimestamp = Timestamp.fromDate(dayStart)
      const endTimestamp = Timestamp.fromDate(dayEnd)
      q = query(
        collectionRef,
        where('date', '>=', startTimestamp),
        where('date', '<=', endTimestamp)
      )
    } else {
      // En caso que no se busque por fecha se hace el query por infra
      q = query(collectionRef, where('infra', '==', searchInfra))
    }

    // 2. ejecutamos la consulta
    const querySnapshot = await getDocs(q)
    const results = querySnapshot.docs.map((doc) => doc.data())

    return {
      ok: true,
      data: results,
      message: 'success'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      data: [],
      message: 'Error al buscar las observaciones'
    }
  }
}
