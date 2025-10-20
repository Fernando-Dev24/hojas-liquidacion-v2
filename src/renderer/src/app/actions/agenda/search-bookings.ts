import { dbPromise } from '@renderer/config/firebase'
import { Booking, Filter } from '@renderer/interfaces'
import { endOfDay, parseISO, startOfDay } from 'date-fns'
import { collection, getDocs, orderBy, Query, query, Timestamp, where } from 'firebase/firestore'

interface Params {
  searchQuery: string
  searchByDate: boolean
  filterBy: Filter
}

export const searchBookingBy = async ({ searchQuery, searchByDate, filterBy }: Params) => {
  try {
    let q: Query
    const db = await dbPromise
    const collectionRef = collection(db, 'bookings')

    if (searchByDate) {
      const d = parseISO(searchQuery)
      const startDay = Timestamp.fromDate(startOfDay(d))
      const endDay = Timestamp.fromDate(endOfDay(d))

      q = query(
        collectionRef,
        where('visitDate', '>=', startDay),
        where('visitDate', '<=', endDay),
        where('bookingDepartment', '==', filterBy),
        orderBy('createdAt', 'desc')
      )
    } else {
      q = query(
        collectionRef,
        where('infra', '==', searchQuery),
        where('bookingDepartment', '==', filterBy),
        orderBy('createdAt', 'desc')
      )
    }

    // Ejecutamos la query
    const snapshot = await getDocs(q)
    const results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Booking, 'id'>)
    }))

    if (results.length < 1) {
      return {
        ok: false,
        message: 'No se encontró resultados',
        data: []
      }
    }

    return {
      ok: true,
      message: '',
      data: results.map((item) => ({
        ...item,
        visitDate: item.visitDate instanceof Timestamp ? item.visitDate.toDate() : item.visitDate,
        createdAt: item.createdAt instanceof Timestamp ? item.createdAt.toDate() : item.createdAt
      }))
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al buscar las reservas',
      data: []
    }
  }
}
