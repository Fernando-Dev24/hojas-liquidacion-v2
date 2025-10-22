import { dbPromise } from '@renderer/config/firebase'
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter
} from 'firebase/firestore'

interface Params {
  page: number
  take: number
  collName: string
}

export const getPaginatedData = async ({ page, take, collName }: Params) => {
  try {
    const db = await dbPromise
    const collectionRef = collection(db, collName)

    // CALCULAR EL DOCUMENTO INICIAL PARA LA PAGINACION
    let dataQuery
    if (page === 1) {
      dataQuery = query(collectionRef, orderBy('date', 'desc'), limit(take))
    } else {
      // OBTENER EL ULTIMO DOCUMENTO DE LA PAGINA ANTERIOR
      const previousPageQuery = query(
        collectionRef,
        orderBy('date', 'desc'),
        limit((page - 1) * take)
      )

      const previousSnapshot = await getDocs(previousPageQuery)
      const lastVisible = previousSnapshot.docs[previousSnapshot.docs.length - 1]

      dataQuery = query(
        collectionRef,
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

    // Calcular el total de paginas segun la cantidad total de elementos en la coleccion
    const countSnapshot = await getCountFromServer(collectionRef)
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
