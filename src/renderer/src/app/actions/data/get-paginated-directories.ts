import { dbPromise } from '@renderer/config/firebase'
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp
} from 'firebase/firestore'

interface Params {
  page: number
  take: number
}

export const getPaginatedDirectories = async ({ page, take }: Params) => {
  try {
    const db = await dbPromise
    const collectionRef = collection(db, 'directories')

    // CALCULAR EL DOCUMENTO INICIAL PARA LA PAGINACION
    let dataQuery
    if (page === 1) {
      dataQuery = query(collectionRef, orderBy('createdAt', 'desc'), limit(take))
    } else {
      // OBTENER EL ULTIMO DOCUMENTO DE LA PAGINA ANTERIOR
      const previousPageQuery = query(
        collectionRef,
        orderBy('createdAt', 'desc'),
        limit((page - 1) * take)
      )

      const previousSnapshot = await getDocs(previousPageQuery)
      const lastVisible = previousSnapshot.docs[previousSnapshot.docs.length - 1]

      dataQuery = query(
        collectionRef,
        orderBy('createdAt', 'desc'),
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
    const countSnapshot = await getCountFromServer(collectionRef)
    const total = countSnapshot.data().count
    const totalPages = Math.ceil(total / take)

    return {
      ok: true,
      data: data.map((booking) => ({
        ...booking,
        createdAt:
          booking.createdAt instanceof Timestamp ? booking.createdAt.toDate() : booking.createdAt,
        updatedAt:
          booking.updatedAt instanceof Timestamp ? booking.updatedAt.toDate() : booking.updatedAt
      })),
      totalPages
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      data: null,
      totalPages: 1
    }
  }
}
