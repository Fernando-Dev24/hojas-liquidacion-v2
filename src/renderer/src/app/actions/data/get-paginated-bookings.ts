import { dbPromise } from '@renderer/config/firebase'
import { Filter } from '@renderer/interfaces'
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore'

interface Params {
  page: number
  take: number
  filterBy: Filter
}

export const getPaginatedBookings = async ({ page, take, filterBy }: Params) => {
  console.log(filterBy)
  try {
    const db = await dbPromise
    const collectionRef = collection(db, 'bookings')

    // CALCULAR EL DOCUMENTO INICIAL PARA LA PAGINACION
    let dataQuery
    if (page === 1) {
      dataQuery = query(
        collectionRef,
        where('bookingDepartment', '==', filterBy),
        orderBy('visitDate', 'desc'),
        limit(take)
      )
    } else {
      // OBTENER EL ULTIMO DOCUMENTO DE LA PAGINA ANTERIOR
      const previousPageQuery = query(
        collectionRef,
        where('bookingDepartment', '==', filterBy),
        orderBy('visitDate', 'desc'),
        limit((page - 1) * take)
      )

      const previousSnapshot = await getDocs(previousPageQuery)
      const lastVisible = previousSnapshot.docs[previousSnapshot.docs.length - 1]

      dataQuery = query(
        collectionRef,
        where('bookingDepartment', '==', filterBy),
        orderBy('visitDate', 'desc'),
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

    // Calcular el total de paginas segun la cantidad total de elementos en la coleccion
    const countSnapshot = await getCountFromServer(dataQuery)
    const total = countSnapshot.data().count
    const totalPages = Math.ceil(total / take)

    return {
      ok: true,
      data,
      totalPages
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      data: null,
      totalPages: 0
    }
  }
}
