import { dbPromise } from '@renderer/config/firebase'
import { ObservationPage } from '@renderer/interfaces'
import { format } from 'date-fns'
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'

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
      const docData = doc.data() as Omit<ObservationPage, 'id'>
      // TODO: Formatear la fecha del documento a un formato fecha legible para la API date
      /* const formattedDate = format(docData.date.toDateString(), 'dd/MM/yyyy')
      return {
        id: doc.id,
        ...docData,
        date: formattedDate
      } */
    })

    return {
      ok: true,
      data
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      data: null
    }
  }
}
