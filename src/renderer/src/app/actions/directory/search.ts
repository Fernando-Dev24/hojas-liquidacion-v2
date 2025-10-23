import { dbPromise } from '@renderer/config/firebase'
import { SchoolDirectoryEntry } from '@renderer/interfaces'
import { collection, getDocs, orderBy, query, Query, Timestamp, where } from 'firebase/firestore'

export const onSearchDirectory = async (searchQuery: string) => {
  if (isNaN(+searchQuery)) {
    return {
      ok: false,
      message: 'Dato de búsqueda invalido'
    }
  }

  try {
    let q: Query
    const db = await dbPromise
    const collectionRef = collection(db, 'directories')
    q = query(collectionRef, where('infra', '==', searchQuery), orderBy('createdAt', 'desc'))

    // Ejecutar la query
    const docSnap = await getDocs(q)
    const data = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any)
    }))

    if (data.length < 1) {
      return {
        ok: false,
        message: 'No se encontraron resultados'
      }
    }

    return {
      ok: true,
      data: data.map((booking) => ({
        ...booking,
        createdAt:
          booking.createdAt instanceof Timestamp ? booking.createdAt.toDate() : booking.createdAt,
        updatedAt:
          booking.updatedAt instanceof Timestamp ? booking.updatedAt.toDate() : booking.updatedAt
      })) as SchoolDirectoryEntry[],
      message: 'Datos encontrados'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al buscar directorios'
    }
  }
}
