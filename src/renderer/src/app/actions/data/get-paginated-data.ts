import { dbPromise } from '@renderer/config/firebase'
import { ObservationPage } from '@renderer/interfaces'
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where
} from 'firebase/firestore'

interface Params {
  page: number
  take: number
  filterByCompleted: boolean
}

export const getPaginatedData = async ({ page, take, filterByCompleted }: Params) => {
  try {
    const db = await dbPromise
    const collectionRef = collection(db, 'observations_pages')

    // CALCULAR EL DOCUMENTO INICIAL PARA LA PAGINACION
    let dataQuery
    if (page === 1) {
      dataQuery = query(
        collectionRef,
        where('isCompleted', '==', filterByCompleted),
        orderBy('date', 'desc'),
        limit(take)
      )
    } else {
      // OBTENER EL ULTIMO DOCUMENTO DE LA PAGINA ANTERIOR
      const previousPageQuery = query(
        collectionRef,
        where('isCompleted', '==', filterByCompleted),
        orderBy('date', 'desc'),
        limit((page - 1) * take)
      )

      const previousSnapshot = await getDocs(previousPageQuery)
      const lastVisible = previousSnapshot.docs[previousSnapshot.docs.length - 1]

      dataQuery = query(
        collectionRef,
        where('isCompleted', '==', filterByCompleted),
        orderBy('date', 'desc'),
        limit(take),
        startAfter(lastVisible)
      )
    }

    // Ejecutar la consulta respectiva
    const snapshot = await getDocs(dataQuery)
    const data = snapshot.docs.map((doc) => {
      const docData = doc.data()
      return {
        id: doc.id,
        ...(docData as any)
      }
    })

    if (data.length < 1) {
      return {
        ok: true,
        data: [],
        totalPages: 1
      }
    }

    // Calcular el total de paginas segun la cantidad total de elementos en la coleccion
    const countSnapshot = await getCountFromServer(dataQuery)
    const total = countSnapshot.data().count
    const totalPages = Math.ceil(total / take)

    return {
      ok: true,
      data: data.map((item) => ({
        ...item,
        date: item.date instanceof Timestamp ? item.date.toDate() : item.date
      })) as ObservationPage[],
      totalPages
    }
  } catch (error) {
    console.log(error)
    return {
      ok: true,
      data: [],
      totalPages: 1
    }
  }
}
